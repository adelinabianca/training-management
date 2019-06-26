import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './FeedbackForm.module.scss';
import { InputLabel, TextField, Button } from '@material-ui/core';

class FeedbackForm extends Component {
    state = {
        submitted: false
    }
    handleSubmit = (newValues) => {
        const { onSubmit } = this.props;
        this.setState({submitted: true})
        onSubmit(newValues);
    }
    render() {
        const { formValues, onSubmit } = this.props;
        const { submitted } = this.state;

        return (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={this.handleSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => {
                    return (
                        <form autoComplete="off" className={styles.formWrapper}>
                            <div className={styles.questionWrapper}>
                                <InputLabel>Ce ti-a placut, ce nu ti-a placut si ce crezi ca am putea imbunatati in cadrul acestui proiect?</InputLabel>
                                <TextField
                                    className={styles.formControl}
                                    value={values.feedback}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    name="feedback"
                                />
                            </div>
                            <div className={styles.buttonsContainer}>
                                {submitted ? <div><i>Multumim pentru feedback!</i></div> : <div />}
                                <Button disabled={values.feedback === ''} onClick={handleSubmit}>Submit</Button>
                            </div>
                            
                        </form>
                    )}
                }
            />
        )
    }

}

export default FeedbackForm;