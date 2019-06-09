import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';

import styles from './Applicants.module.scss';
import { getUser, updateUser } from '../../../../core/api/users';
import { Grid, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
import { getCourse, updateCourse } from '../../../../core/api/courses';
import CustomButton from '../../../../core/components/CustomButton/CustomButton';
// import { TextField, Button, Tooltip } from '@material-ui/core';
// import { Add } from '@material-ui/icons';

class Applicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
            seeAnswersDialog: false,
            selectedApplication: null
        }
    }

    async componentDidMount() {
        await this.init()
    }

    async componentDidUpdate(prevProps) {
        const { applicants, course: { courseId } } = this.props;
        if (JSON.stringify(applicants) !== JSON.stringify(prevProps.applicants) 
            || courseId !== prevProps.course.courseId) {
            await this.init();
        }
    }

    init = async() => {
        const { applicants, course: { courseId } } = this.props;
        let allApplicants = [];
        if (applicants.length) {
            applicants.forEach(async userUID => {
                await getUser(userUID).then(response => {
                    const applicant = response.data;
                    applicant.applications = applicant.applications.filter(application => application.courseId === courseId)
                    allApplicants = [...allApplicants, applicant];
                    this.setState({ applicants: allApplicants, seeAnswersDialog: false, selectedApplication: null });
                })
            });
        }
        
        this.setState({ applicants: allApplicants, seeAnswersDialog: false, selectedApplication: null });
    }

    openAnswersDialog = (application) => {
        this.setState({ seeAnswersDialog: true, selectedApplication: application.answers });
    }

    handleCloseDialog = () => {
        this.setState({ seeAnswersDialog: false });
    }

    handleAcceptUser = async (acceptedUser) => {
        const { onAcceptUser } = this.props;
        await onAcceptUser(acceptedUser);
    }

    handleRemoveUser = async (rejectedUser) => {
        const { onRemoveUser } = this.props;
        await onRemoveUser(rejectedUser);
    }


    render() {
        const { applicants, seeAnswersDialog, selectedApplication } = this.state;
        const { course: { members } } = this.props;
        const courseMembers = members || [];
        return (
            <div className={styles.wrapper}>
                <ul>
                    <li className={styles.listHeader}>
                        <Grid container>
                            <Grid item xs={2}><span><strong>Aplicant</strong></span></Grid>
                            <Grid item xs={3}><span><strong>Formular de aplicare</strong></span></Grid>
                            <Grid item xs={2}><span><strong>Data</strong></span></Grid>
                            <Grid item xs={3}><span><strong>Observatii</strong></span></Grid>
                            <Grid item xs={2}><span><strong>Actiuni</strong></span></Grid>
                        </Grid>
                    </li>
                    {applicants.map((user, index) => {
                        return (
                            <li key={index} className={styles.listItem}>
                                <Grid container>
                                    <Grid item xs={2}>
                                        aplicant#{index}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button className={styles.seeAnswersBtn} onClick={() => this.openAnswersDialog(user.applications[0])}>Vezi raspunsuri</Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        azi
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField placeholder="Observatii" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        {!courseMembers.includes(user.uid) && (<CustomButton onClick={() => this.handleAcceptUser(user)}>Accepta</CustomButton>)}
                                        {courseMembers.includes(user.uid) && (<CustomButton onClick={() => this.handleRemoveUser(user)}>Sterge</CustomButton>)}
                                    </Grid>
                                </Grid>
                            </li>
                        )
                    })}
                </ul>
                <Dialog open={seeAnswersDialog} onClose={this.handleCloseDialog}>
                    <DialogContent>
                        {selectedApplication && Object.keys(selectedApplication).map(question => (
                            <div key={question}>
                                <div>{question}</div>
                                <div>{selectedApplication[question]}</div>
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default Applicants;