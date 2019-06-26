import React, { Component } from 'react';
import { Formik } from 'formik';
import { InputLabel, TextField} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

import { withFirebase } from '../../Firebase';
import CustomButton from '../../core/components/CustomButton/CustomButton';
import styles from './EditAccountDetailsForm.module.scss';
import { updateUser } from '../../core/api/users';

@inject('sessionStore')
@observer
class EditAccountDetailsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {},
            isSubmiting: false
        }
    }

    componentDidMount() {
        const { sessionStore: { authUser } } = this.props;
        this.setState({ formValues: { ...authUser } })
    }
    
    onSubmit = async (newValues) => {
        console.log(newValues);
        this.setState({ isSubmiting: true });
        await updateUser(newValues).then((response) => {
            console.log(response.data)
            this.setState({ isSubmiting: false, formValues: { ...response.data } })
        })
    }

    render() {
        const { formValues, isSubmiting } = this.state;
        
        const initialValues = {
            email: '',
            username: '',
            linkedin: '',
            study: '',
            phone: '',
            ...formValues
        }
        return (
            <div className={styles.wrapper}>
                <h2>Editeaza detaliile contului</h2>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={this.onSubmit}
                    render={({ handleSubmit, handleChange, handleBlur, values, setFieldValue, errors, touched }) => {
                        return (
                            <form autoComplete="off" className={styles.formWrapper}>
                                <div className={styles.fieldWrapper}>
                                    <InputLabel className={styles.ariaLabel}>E-mail</InputLabel>
                                    <TextField
                                        id="email"
                                        className={styles.formControl}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        variant="outlined"
                                        name="email"
                                    />
                                </div>
                                <div className={styles.fieldWrapper}>
                                    <InputLabel className={styles.ariaLabel}>Nume Prenume</InputLabel>
                                    <TextField
                                        id='username'
                                        className={styles.formControl}
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        variant="outlined"
                                        name="username"
                                    />
                                </div>
                                <div className={styles.fieldWrapper}>
                                    <InputLabel className={styles.ariaLabel}>LinkedIn</InputLabel>
                                    <TextField
                                        id='linkedin'
                                        className={styles.formControl}
                                        value={values.linkedin}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        variant="outlined"
                                        name="linkedin"
                                    />
                                </div>
                                <div className={styles.fieldWrapper}>
                                    <InputLabel className={styles.ariaLabel}>Scoala/Facultate/Companie</InputLabel>
                                    <TextField
                                        id='study'
                                        className={styles.formControl}
                                        value={values.study}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        variant="outlined"
                                        name="study"
                                    />
                                </div>
                                <div className={styles.fieldWrapper}>
                                    <InputLabel className={styles.ariaLabel}>Telefon</InputLabel>
                                    <TextField
                                        id='phone'
                                        className={styles.formControl}
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        variant="outlined"
                                        name="phone"
                                    />
                                </div>
                                
                                <div className={styles.buttonsContainer}>
                                    <CustomButton isLoading={isSubmiting} onClick={handleSubmit}>Salveaza</CustomButton>
                                </div>
                            </form>
                        )}
                    }
                />
            </div>
        )
    }

}

export default withFirebase(EditAccountDetailsForm);