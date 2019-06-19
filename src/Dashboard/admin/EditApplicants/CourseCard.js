import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardContent, Collapse, IconButton, Grid, Checkbox } from '@material-ui/core';

import styles from './CourseCard.module.scss';
import { getUser, updateUser } from '../../../core/api/users';
import { updateCourse } from '../../../core/api/courses';

class CourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            applicants: []
        }
    }

    componentDidMount() {
        const { course: { members } } = this.props;
        if (members) {
            const userPromises = members.map(async user => {
                return await getUser(user.uid).then(response => {return response.data});
            })
            Promise.all(userPromises).then((res) => {
                this.setState({ applicants: res })
            })
        }
    }

    handleExpandClick = () => {
        const { isExpanded } = this.state;
        this.setState({ isExpanded: !isExpanded });
    }

    getDefaultCourseFromUser = (user) => {
        const { course } = this.props;
        return user.participantCoursesIds.find(c=> c.courseId === course.courseId);
    }

    handleContacted = (e, user) => {
        const { target: { checked } } = e;
        const { applicants } = this.state;
        const { course } = this.props;
        
        const courseIndex = user.participantCoursesIds.findIndex(course => course.courseId === this.getDefaultCourseFromUser(user).courseId);
        const memberIndex = course.members.findIndex(member => member.uid === user.uid);
        if (checked) {
            user.participantCoursesIds[courseIndex] = {
                ...user.participantCoursesIds[courseIndex],
                contacted: true
            }

            course.members[memberIndex] = {
                ...course.members[memberIndex],
                contacted: true
            }
        } else {
            user.participantCoursesIds[courseIndex] = {
                ...user.participantCoursesIds[courseIndex],
                contacted: false
            }

            course.members[memberIndex] = {
                ...course.members[memberIndex],
                contacted: false
            }
        }

        const userIndex = applicants.findIndex(applicant => applicant.uid === user.uid);
        applicants[userIndex] = user;
        this.setState({ applicants });
        updateUser(user);
        updateCourse(course);
    }

    handleConfirmation = (e, user) => {
        const { target: { checked } } = e;
        const { applicants } = this.state;
        const { course } = this.props;
        
        const courseIndex = user.participantCoursesIds.findIndex(course => course.courseId === this.getDefaultCourseFromUser(user).courseId);
        const memberIndex = course.members.findIndex(member => member.uid === user.uid);
        if (checked) {
            user.participantCoursesIds[courseIndex] = {
                ...user.participantCoursesIds[courseIndex],
                confirmed: true
            }
            
            course.members[memberIndex] = {
                ...course.members[memberIndex],
                confirmed: true
            }
        } else {
            user.participantCoursesIds[courseIndex] = {
                ...user.participantCoursesIds[courseIndex],
                confirmed: false
            }

            course.members[memberIndex] = {
                ...course.members[memberIndex],
                confirmed: false
            }
        }

        
        const userIndex = applicants.findIndex(applicant => applicant.uid === user.uid);
        applicants[userIndex] = user;
        this.setState({ applicants });
        updateUser(user);
        updateCourse(course);
    }

    render() {
        const { course } = this.props;
        const { isExpanded, applicants } = this.state;

        return (
            <div className={styles.wrapper}>
                <Card className={styles.card}>
                    <CardContent className={styles.header}>
                        <h2>{course.name}</h2>
                        <IconButton
                            className={[styles.expand, isExpanded ? styles.expandOpen : ''].join(' ')}
                            onClick={this.handleExpandClick}
                            aria-expanded={isExpanded}
                            aria-label="Show more"
                            >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardContent>
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <CardContent className={styles.tableWrapper}>
                            {applicants.length === 0 ? (
                                <div>Nu sunt aplicanti la acest curs.</div>
                            ) : (
                                <ul>
                                    <li className={styles.listHeader}>
                                        <Grid container>
                                            <Grid item xs={3}><span><strong>Nume</strong></span></Grid>
                                            <Grid item xs={3}><span><strong>E-mail</strong></span></Grid>
                                            <Grid item xs={2}><span><strong>Telefon</strong></span></Grid>
                                            <Grid item xs={2}><span><strong>Contactat</strong></span></Grid>
                                            <Grid item xs={2}><span><strong>Confirmat</strong></span></Grid>
                                        </Grid>
                                    </li>
                                    {applicants.map(applicant => (
                                        <li key={applicant.uid} className={styles.listHeader}>
                                            <Grid container>
                                                <Grid item xs={3}><span>{applicant.username}</span></Grid>
                                                <Grid item xs={3}><span>{applicant.email}</span></Grid>
                                                <Grid item xs={2}><span>{applicant.phone}</span></Grid>
                                                <Grid item xs={2}>
                                                    <span>
                                                    <Checkbox 
                                                        checked={this.getDefaultCourseFromUser(applicant).contacted}
                                                        value='contacted'
                                                        onChange={(e) => this.handleContacted(e, applicant)}/>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <span>
                                                    <Checkbox 
                                                        checked={this.getDefaultCourseFromUser(applicant).confirmed}
                                                        value="confirmed"
                                                        onChange={(e) => this.handleConfirmation(e, applicant)} />
                                                    </span>
                                                </Grid>
                                            </Grid>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Collapse>
                </Card>
            </div>
        );
    }
}

export default CourseCard;