import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditAriaForm.module.scss';
import { InputLabel, TextField, Button, Card } from '@material-ui/core';
import { withFirebase } from '../../Firebase';
import { inject, observer } from 'mobx-react';
import EditCourseForm from '../EditCourseForm/EditCourseForm';
import { updateUser } from '../../core/api/users';

@inject('userStore')
@observer
class EditAriaForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            addNewCourse: false
        }
    }

    onSubmitCourseForm = (newValues, setFieldValue, allAriaCourses, isNewCourse = false) => {
        const filteredCourses = allAriaCourses.filter(course => course.courseId !== newValues.courseId);
        if (isNewCourse) {
            const { allCoursesLength } = this.props;
            newValues.courseId = allCoursesLength;
        }
        const updatedCourses = [...filteredCourses, newValues].sort((a, b) => a.courseId - b.courseId);
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

        setFieldValue('courses', updatedCourses);
        this.setState({ addNewCourse: false });
    }

    addNewCourse = () => {
        this.setState({ addNewCourse: true })
    }

    render() {
        const { formValues, onSubmit } = this.props;
        const {  addNewCourse } = this.state;
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
                    console.log(values.courses)
                    return (
                         <form autoComplete="off" className={styles.formWrapper}>
                            <div className={styles.fieldWrapper}>
                                <InputLabel className={styles.ariaLabel}>Name</InputLabel>
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
                                <InputLabel className={styles.ariaLabel}>Description</InputLabel>
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
                                <InputLabel className={styles.ariaLabel}>Courses</InputLabel>
                                <Button onClick={this.addNewCourse}>Add new course</Button>
                                <div className={styles.coursesWrapper}>
                                    {addNewCourse && (
                                        <EditCourseForm 
                                            formValues={defaultCourseValues} 
                                            onSubmit={(newValues) => this.onSubmitCourseForm(newValues, setFieldValue, values.courses, true)}
                                        />
                                    )}
                                    {values.courses.map(course => {
                                        return (
                                            <EditCourseForm 
                                                key={course.courseId} 
                                                formValues={{ ...defaultCourseValues, ...course }} 
                                                onSubmit={(newValues) => this.onSubmitCourseForm(newValues, setFieldValue, values.courses)}
                                            />
                                        )
                                    })}

                                </div>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </div>
                        </form>
                    )}
                }
            />
        )
    }

}

export default withFirebase(EditAriaForm);