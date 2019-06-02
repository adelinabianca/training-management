import React, { Component } from 'react';
import { Formik } from 'formik';
import styles from './EditCourseForm.module.scss';
import { InputLabel, TextField, Button, Card, Input, MenuItem, FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { withFirebase } from '../../Firebase';
import { inject, observer } from 'mobx-react';
import { getAllUsers } from '../../core/api/users';

@inject('userStore')
@observer
class EditCourseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTrainers: [],
            formValues: null,
            isLoading: false
        }
    }
    async componentDidMount() {
        const { formValues, userStore: { userList, setUsers } } = this.props;
        if(!formValues || !userList.length) {
            this.setState({ isLoading: true });
        }

        await getAllUsers().then(response => {
            setUsers(response.data);
            const allTrainers = Object.values(response.data).filter(user => user.roles.includes('trainer'));
            let selectedTrainers = []
            if (formValues.trainersIds) {
                selectedTrainers = allTrainers.filter(trainer => formValues.trainersIds.includes(trainer.uid));
            }
            formValues.trainers = selectedTrainers;

            this.setState({ allTrainers, formValues, isLoading: false })
        })

        // firebase.users().on('value', snapshot => {
        //     setUsers(snapshot.val());
        //     this.setState({ isLoading: false });
        // });
    }

    render() {
        const { onSubmit } = this.props;
        const { allTrainers, formValues } = this.state;

        // const trainers = userList.length ? userList.filter(user => user.roles.includes('trainer')) : [];
        // const selectedTrainers = userList.length && formValues ? userList.filter(user => formValues.trainersIds.includes(user.uid)) : []
        return formValues && (
            <Formik
                initialValues={formValues}
                enableReinitialize
                onSubmit={onSubmit}
                render={({ handleSubmit, handleChange, handleBlur, values, setFieldValue, errors, touched }) => {
                    return (
                        <Card className={styles.courseCard} key={values.id}>
                            {/* course name */}
                            <InputLabel>Course name</InputLabel>
                            <FormControl>
                                <TextField
                                    id='name'
                                    className={styles.formControl}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    margin="normal"
                                    variant="outlined"
                                    name='name'
                                />
                            </FormControl>

                            {/* course description */}
                            <InputLabel>Course description</InputLabel>
                            <FormControl>
                                <TextField
                                    id='description'
                                    className={styles.formControl}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    margin="normal"
                                    multiline
                                    variant="outlined"
                                    name='description'
                                />
                            </FormControl>

                            {/* trainers */}
                            <InputLabel>Trainers</InputLabel>
                            <FormControl className={styles.formControl}>
                                <Select
                                multiple
                                value={values.trainers}
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={styles.chips}>
                                    {selected.map(value => (
                                        <Chip key={value.uid} label={value.username} className={styles.chip} />
                                    ))}
                                    </div>
                                )}
                                name='trainers'
                                // MenuProps={{
                                //     PaperProps: {
                                //       style: {
                                //         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                //         width: 250,
                                //       },
                                //     },
                                //   }}
                                >
                                {[...allTrainers].map(trainer => (
                                    <MenuItem key={trainer.uid} value={trainer} >
                                        {trainer.username}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            
                            <div className={styles.buttonsContainer}>
                                <Button onClick={handleSubmit}>Save changes</Button>
                            </div>
                        </Card>
                    )}
                }
            />
        )
    }

}

export default withFirebase(EditCourseForm);