import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditAriaForm.module.scss';
import { InputLabel, TextField, Button } from '@material-ui/core';

class EditAriaForm extends Component {
    render() {
        const { formValues, onSubmit } = this.props;
        console.log( formValues)
        return formValues && (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => {
                    return (
                        <form autoComplete="off" className={styles.formWrapper}>
                            <div className={styles.questionWrapper}>
                                <InputLabel>Name</InputLabel>
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
                            <div className={styles.questionWrapper}>
                                <InputLabel>Description</InputLabel>
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
                            <div className={styles.questionWrapper}>
                                {/* <InputLabel>Courses</InputLabel>
                                {values.courses.map(course => {
                                    return (
                                        <div className={styles.courseWrapper}>

                                        </div>
                                    )
                                })} */}
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

export default EditAriaForm;