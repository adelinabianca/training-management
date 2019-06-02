import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';

import styles from './Applicants.module.scss';
import { getUser } from '../../../../core/api/users';
import { Grid, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
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
        const { applicants, courseId } = this.props;
        if (JSON.stringify(applicants) !== JSON.stringify(prevProps.applicants) || courseId !== prevProps.courseId) {
            await this.init();
        }
    }

    init = async() => {
        const { applicants, courseId } = this.props;
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
        this.setState({ seeAnswersDialog: true, selectedApplication: application.answers })
    }


    render() {
        const { applicants, seeAnswersDialog, selectedApplication } = this.state;
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
                                <Button>Accepta</Button>
                            </Grid>
                        </Grid>
                    )
                })}
                <Dialog open={seeAnswersDialog}>
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