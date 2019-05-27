import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditCourseForm.module.scss';
import { InputLabel, TextField, Button, Card } from '@material-ui/core';
import { withFirebase } from '../../Firebase';
import { inject, observer } from 'mobx-react';

@inject('userStore')
@observer
class EditCourseForm extends Component {
    componentDidMount() {
        const { firebase, userStore: { userList, setUsers } } = this.props;
        if(!userList.length) {
            this.setState({ isLoading: true });
        }

        firebase.users().on('value', snapshot => {
            setUsers(snapshot.val());
            this.setState({ isLoading: false });
        });
    }

    render() {
        const { formValues, onSubmit, userStore: { userList } } = this.props;
        // console.log(formValues)
        const trainers = userList.length ? userList.filter(user => user.roles.includes('trainer')) : [];
        // console.log(trainers)
        return formValues && (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, setFieldValue, errors, touched }) => {
                    return (
                        // <form autoComplete="off" className={styles.formWrapper}>
                            <Card className={styles.courseCard} key={values.name}>
                                <InputLabel>Course name</InputLabel>
                                <TextField
                                    id='name'
                                    className={styles.formControl}
                                    value={values.name}
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    margin="normal"
                                    variant="outlined"
                                    name='name'
                                />

                                <InputLabel>Course description</InputLabel>
                                <TextField
                                    id='description'
                                    className={styles.formControl}
                                    value={values.description}
                                    onChange={handleChange}
                                    // onBlur={handleBlur}
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    name='description'
                                />
                                
                                <div className={styles.buttonsContainer}>
                                    <Button onClick={handleSubmit}>Save changes</Button>
                                </div>
                            </Card>
                        // </form>
                    )}
                }
            />
        )
    }

}

export default withFirebase(EditCourseForm);