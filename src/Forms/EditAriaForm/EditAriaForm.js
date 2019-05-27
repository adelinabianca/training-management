import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditAriaForm.module.scss';
import { InputLabel, TextField, Button, Card } from '@material-ui/core';
import { withFirebase } from '../../Firebase';
import { inject, observer } from 'mobx-react';
import EditCourseForm from '../EditCourseForm/EditCourseForm';

@inject('userStore')
@observer
class EditAriaForm extends Component {
    // componentDidMount() {
    //     const { firebase, userStore: { userList, setUsers } } = this.props;
    //     if(!userList.length) {
    //         this.setState({ isLoading: true });
    //     }

    //     firebase.users().on('value', snapshot => {
    //         setUsers(snapshot.val());
    //         this.setState({ isLoading: false });
    //     });
    // }

    onSubmitCourseForm = (newValues, setFieldValue, allCourses) => {
        // console.log(newValues)
        // console.log(allCourses)
        const filteredCourses = allCourses.filter(course => course.id !== newValues.id);
        const updatedCourses = [...filteredCourses, newValues];
        console.log(updatedCourses)
        setFieldValue('courses', updatedCourses);
    }

    render() {
        const { formValues, onSubmit } = this.props;
        // console.log(formValues)
        // const trainers = userList.length ? userList.filter(user => user.roles.includes('trainer')) : [];
        // // console.log(trainers)
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
                                <div className={styles.coursesWrapper}>
                                    {values.courses.map(course => {
                                        return (
                                            <EditCourseForm 
                                                key={course.id || course.name} 
                                                formValues={course} 
                                                onSubmit={(newValues) => this.onSubmitCourseForm(newValues, setFieldValue, values.courses)} />
                                            // <Card className={styles.courseCard} key={course.name}>
                                            //     <InputLabel>Course name</InputLabel>
                                            //     <TextField
                                            //         id='course-name'
                                            //         className={styles.formControl}
                                            //         value={course.name}
                                            //         // onChange={handleChange}
                                            //         onBlur={handleBlur}
                                            //         margin="normal"
                                            //         variant="outlined"
                                            //         name={course.name}
                                            //     />

                                            //     <InputLabel>Course description</InputLabel>
                                            //     <TextField
                                            //         id='course-description'
                                            //         className={styles.formControl}
                                            //         value={course.description}
                                            //         // onChange={handleChange}
                                            //         onBlur={handleBlur}
                                            //         margin="normal"
                                            //         multiline
                                            //         variant="outlined"
                                            //         name={course.description}
                                            //     />
                                            // </Card>
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