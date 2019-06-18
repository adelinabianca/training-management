import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardContent, Collapse, IconButton, Grid, Checkbox } from '@material-ui/core';

import styles from './CourseCard.module.scss';
import { getUser } from '../../../core/api/users';

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
                return await getUser(user).then(response => {return response.data});
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
        return user.participantCoursesId.find(c=> c.courseId === course.courseId);
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
                                                <Grid item xs={2}><span><Checkbox value={this.getDefaultCourseFromUser(applicant).contacted}/></span></Grid>
                                                <Grid item xs={2}><span><Checkbox value={this.getDefaultCourseFromUser(applicant).confirmed}/></span></Grid>
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