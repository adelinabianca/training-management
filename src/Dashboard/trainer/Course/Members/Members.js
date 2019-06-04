import React, { Component } from 'react';
// import Fab from '@material-ui/core/Fab';

import styles from './Members.module.scss';
import { getUser, updateUser } from '../../../../core/api/users';
import { Grid, Button, TextField, Dialog, DialogContent } from '@material-ui/core';
import { getCourse, updateCourse } from '../../../../core/api/courses';
// import { TextField, Button, Tooltip } from '@material-ui/core';
// import { Add } from '@material-ui/icons';

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
            members.forEach(async userUID => {
                await getUser(userUID).then(response => {
                    const member = response.data;
                    member.applications = member.applications.filter(application => application.courseId === courseId)
                    allMembers = [...allMembers, member];
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

    // handleAcceptUser = async (acceptedUser) => {
    //     const { courseId } = this.props;
    //     console.log(acceptedUser);
    //     await getUser(acceptedUser.uid).then(async response => {
    //         const user = response.data;
    //         const participantCourses = user.participantCoursesIds ? [...user.participantCoursesIds, courseId] : [courseId];
    //         const updatedUser = { ...response.data, participantCoursesIds: participantCourses}
    //         await updateUser(updatedUser).then(res => {})
    //     });
    //     await getCourse(courseId).then(async response => {
    //         const course = response.data;
    //         const members = course.members ? [...course.members, acceptedUser.uid] : [acceptedUser.uid];
    //         const updatedCourse = {...course, members};
    //         await updateCourse(updatedCourse).then(() => {});
    //     })
    // }


    render() {
        const { members, seeAnswersDialog, selectedApplication } = this.state;
        return (
            <div className={styles.wrapper}>
                {members.map((user, index) => {
                    return (
                        <Grid key={index} container>
                            <Grid item xs={2}>
                                {user.username}
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
                                {/* <Button onClick={() => this.handleAcceptUser(user)}>Accepta</Button> */}
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

export default Members;