import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';

import styles from './Applicants.module.scss';
import { getUser, updateUser } from '../../../../core/api/users';
import { Grid, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
import { getCourse, updateCourse } from '../../../../core/api/courses';
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
                {applicants.map((user, index) => {
                    return (
                        <Grid key={index} container>
                            <Grid item xs={2}>
                                aplicant#{index}
                            </Grid>
                            <Grid item xs={3}>
                                <div role="button" onClick={() => this.openAnswersDialog(user.applications[0])}>Vezi raspunsuri</div>
                            </Grid>
                            <Grid item xs={2}>
                                azi
                            </Grid>
                            <Grid item xs={3}>
                                <TextField placeholder="Observatii" />
                            </Grid>
                            <Grid item xs={2}>
                                {!courseMembers.includes(user.uid) && (<Button onClick={() => this.handleAcceptUser(user)}>Accepta</Button>)}
                                {courseMembers.includes(user.uid) && (<Button onClick={() => this.handleRemoveUser(user)}>Sterge</Button>)}
                            </Grid>
                        </Grid>
                    )
                })}
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