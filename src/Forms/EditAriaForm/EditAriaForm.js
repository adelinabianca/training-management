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

    onSubmitCourseForm = (newValues, setFieldValue, allCourses, isNewCourse = false) => {
        const filteredCourses = allCourses.filter(course => course.id !== newValues.id);
        if (isNewCourse) {
            newValues.id = allCourses.length;
        }
        console.log(newValues)
        const updatedCourses = [...filteredCourses, newValues].sort((a, b) => a.id - b.id);
        // console.log(updatedCourses)

        //connect user to course
        if (newValues.trainers) {
            const { formValues } = this.props;
            const users = [...newValues.trainers];
            users.map(trainer => {
                const asignedCourse = { courseId: newValues.id, fromAriaId: formValues.id }
                if (trainer.asignedCourses) {
                    trainer.asignedCourses = [...trainer.asignedCourses, asignedCourse ]
                } else {
                    trainer.asignedCourses = [ asignedCourse]
                }
                updateUser(trainer).then(response => console.log(response))
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
                                                key={course.id || course.name} 
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