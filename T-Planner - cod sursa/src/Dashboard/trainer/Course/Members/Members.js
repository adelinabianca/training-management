import React, { Component } from 'react';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Clear from '@material-ui/icons/Clear';

import styles from './Members.module.scss';
import { getUser } from '../../../../core/api/users';
import { Grid, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            seeAnswersDialog: false,
            selectedApplication: null
        }
    }

    async componentDidMount() {
        await this.init()
    }

    async componentDidUpdate(prevProps) {
        const { members, courseId } = this.props;
        if (JSON.stringify(members) !== JSON.stringify(prevProps.members) || courseId !== prevProps.courseId) {
            await this.init();
        }
    }

    init = async() => {
        const { members, courseId } = this.props;
        let allMembers = [];
        if (members.length) {
            members.forEach(async user => {
                await getUser(user.uid).then(response => {
                    const member = response.data;
                    member.applications = member.applications.filter(application => application.courseId === courseId)
                    allMembers = [...allMembers, {...member, confirmed: user.confirmed}];
                    this.setState({ members: allMembers, seeAnswersDialog: false, selectedApplication: null });
                })
            });
        }
        
        this.setState({ members: allMembers, seeAnswersDialog: false, selectedApplication: null });
    }

    openAnswersDialog = (application) => {
        this.setState({ seeAnswersDialog: true, selectedApplication: application.answers });
    }

    handleCloseDialog = () => {
        this.setState({ seeAnswersDialog: false });
    }


    render() {
        const { fullScreen } = this.props;
        const { members, seeAnswersDialog, selectedApplication } = this.state;
        return (
            <div className={styles.wrapper}>
                <ul>
                    <li className={styles.listHeader}>
                        <Grid container>
                            <Grid item xs={3}><span><strong>Nume</strong></span></Grid>
                            <Grid item xs={3}><span><strong>Formular de aplicare</strong></span></Grid>
                            <Grid item xs={3}><span><strong>Data</strong></span></Grid>
                            <Grid item xs={3}><span><strong>Confirmed</strong></span></Grid>
                        </Grid>
                    </li>
                    {members.map((user, index) => {
                        return (
                        <li key={index} className={styles.listItem}>
                            <Grid container>
                                <Grid item xs={3}>
                                    {user.username}
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={styles.seeAnswersBtn} onClick={() => this.openAnswersDialog(user.applications[0])}>Vezi raspunsuri</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    {user.applications[0].applicationDate || '-'}
                                </Grid>
                                <Grid item xs={3}>
                                    {user.confirmed ? <CheckIcon className={styles.checkIcon} /> : <ClearIcon className={styles.clearIcon} />}
                                </Grid>
                            </Grid>
                        </li>
                        )
                    })}
                </ul>
                <Dialog open={seeAnswersDialog} onClose={this.handleCloseDialog} fullScreen={fullScreen}>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            <Clear />
                        </Button>
                    </DialogActions>
                    <DialogContent className={styles.dialogContent}>
                        {selectedApplication && Object.keys(selectedApplication).map(question => (
                            <div key={question}>
                                <div className={styles.question}>{question}</div>
                                <div className={styles.answer}>{selectedApplication[question]}</div>
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withMobileDialog()(Members);