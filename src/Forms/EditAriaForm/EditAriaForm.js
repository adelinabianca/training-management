import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditAriaForm.module.scss';
import { InputLabel, TextField, Button, Card } from '@material-ui/core';
import { withFirebase } from '../../Firebase';
import { inject, observer } from 'mobx-react';
import EditCourseForm from '../EditCourseForm/EditCourseForm';
import { updateUser } from '../../core/api/users';
import CustomButton from '../../core/components/CustomButton/CustomButton';

@inject('userStore')
@observer
class EditAriaForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            addNewCourse: false,
            isCourseSubmitting: false
        }
    }

    onSubmitCourseForm = (newValues, setFieldValue, allAriaCourses, isNewCourse = false) => {
        this.setState({ isCourseSubmitting: true });
        const filteredCourses = allAriaCourses.filter(course => course.courseId !== newValues.courseId);
        if (isNewCourse) {
            const { allCoursesLength } = this.props;
            newValues.courseId = allCoursesLength;
        }
        //connect user to course
        if (newValues.trainers) {
            const users = [...newValues.trainers];
            newValues.trainersIds = users.map(user => user.uid);
            users.forEach(trainer => {
                if (trainer.asignedCoursesIds) {
                    if (!trainer.asignedCoursesIds.includes(newValues.courseId)) {
                        trainer.asignedCoursesIds = [...trainer.asignedCoursesIds, newValues.courseId ]
                    }
                } else {
                    trainer.asignedCoursesIds = [ newValues.courseId ]
                }
                updateUser(trainer).then(response => {})
            })
        }
        
        const updatedCourses = [...filteredCourses, newValues].sort((a, b) => a.courseId - b.courseId);

        setFieldValue('courses', updatedCourses);
        this.setState({ addNewCourse: false, isCourseSubmitting: false });
    }

    addNewCourse = () => {
        this.setState({ addNewCourse: true })
    }

    render() {
        const { formValues, onSubmit, isSubmiting } = this.props;
        const {  addNewCourse, isCourseSubmitting } = this.state;
        const defaultCourseValues = {
            name: '',
            description: '',
            trainers: []
        }

        return formValues && (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, setFieldValue, errors, touched }) => {
                    return (
                         <form autoComplete="off" className={styles.formWrapper}>
                            <div className={styles.fieldWrapper}>
                                <InputLabel className={styles.ariaLabel}>Nume</InputLabel>
                                <TextField
                                    id="name"
                                    className={styles.formControl}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    name="name"
                                />
                            </div>
                            <div className={styles.fieldWrapper}>
                                <InputLabel className={styles.ariaLabel}>Descrierea ariei</InputLabel>
                                <TextField
                                    id='description'
                                    className={styles.formControl}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    name="description"
                                />
                            </div>
                            <div className={styles.fieldWrapper}>
                                <InputLabel className={styles.ariaLabel}>Cursuri</InputLabel>
                                <div className={styles.coursesWrapper}>
                                    {values.courses ? values.courses.map(course => {
                                        return (
                                            <EditCourseForm 
                                                key={course.courseId} 
                                                formValues={{ ...defaultCourseValues, ...course }} 
                                                onSubmit={(newValues) => this.onSubmitCourseForm(newValues, setFieldValue, values.courses)}
                                                isSubmitting={isCourseSubmitting}
                                            />
                                        )
                                    }) : null}
                                    {addNewCourse && (
                                        <EditCourseForm 
                                            formValues={defaultCourseValues} 
                                            onSubmit={(newValues) => this.onSubmitCourseForm(newValues, setFieldValue, values.courses, true)}
                                            isSubmiting={isCourseSubmitting}
                                        />
                                    )}
                                </div>
                                <CustomButton onClick={this.addNewCourse}>Adauga curs</CustomButton>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <CustomButton isLoading={isSubmiting} onClick={handleSubmit}>Salveaza</CustomButton>
                            </div>
                        </form>
                    )}
                }
            />
        )
    }

}

export default withFirebase(EditAriaForm);