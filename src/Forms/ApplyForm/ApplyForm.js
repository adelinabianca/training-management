import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import styles from './ApplyForm.module.scss';
import { InputLabel, TextField, Button } from '@material-ui/core';

class ApplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: [],
            questions: []
        }
    }

    // componentDidMount() {
    //     const { formValues } = this.props;
    //     const questions = Object.keys(formValues);
    //     this.setState({ formValues, questions })
    // }


    onSubmit = (newValues) => {
        console.log(newValues)
    }

    render() {
        const { formValues } = this.props;
        const questions = Object.keys(formValues);
        console.log(formValues)
        return (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={this.onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => {
                    return (
                        <form autoComplete="off" className={styles.formWrapper}>
                            {questions.map(question => {
                                console.log(values[question])
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
                                            name={question}
                                        />
                                    </div>
                            )})}
                            <Button onClick={handleSubmit}>Submit</Button>
                        </form>
                    )}
                }
            />
        )
    }

}

export default ApplyForm;