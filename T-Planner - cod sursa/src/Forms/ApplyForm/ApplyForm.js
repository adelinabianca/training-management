import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './ApplyForm.module.scss';
import { InputLabel, TextField, Button } from '@material-ui/core';

class ApplyForm extends Component {
    render() {
        const { formValues, onSubmit } = this.props;
        const questions = Object.keys(formValues);
        if (!questions.length) {
            return (<div>Perioada de inscriere inca nu a inceput. Urmariti pagina noastra pentru a fi la curent cu toate detaliile.</div>)
        }
        return (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => {
                    return (
                        <form autoComplete="off" className={styles.formWrapper}>
                            {questions.map(question => {
                                return (
                                    <div key={question} className={styles.questionWrapper}>
                                        <InputLabel>{question}</InputLabel>
                                        <TextField
                                            id={question}
                                            className={styles.formControl}
                                            value={values[question]}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            margin="normal"
                                            multiline
                                            variant="outlined"
                                            name={question}
                                        />
                                    </div>
                            )})}
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

export default ApplyForm;