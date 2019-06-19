import React, { Component } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardContent, Collapse, IconButton } from '@material-ui/core';

import styles from './AttendanceCourseCard.module.scss';
import Session from './Session';

class AttendanceCourseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
            attendanceSessions: []
        }
    }

    componentDidMount() {
        const { course: { attendance } } = this.props;
        if (attendance) {
            this.setState({ attendanceSessions: attendance })
        }
    }

    handleExpandClick = () => {
        const { isExpanded } = this.state;
        this.setState({ isExpanded: !isExpanded });
    }

    render() {
        const { course } = this.props;
        const { isExpanded, attendanceSessions } = this.state;

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
                            {attendanceSessions.length === 0 ? (
                                <div>Nu sunt sesiuni de prezenta la acest curs.</div>
                            ) : (
                                <ul>
                                    {attendanceSessions.map((session, index) => (
                                        <li key={session.uniqueCode+session.date} className={styles.listHeader}>
                                            <div><h3>{session.date}</h3></div>
                                            <Session session={session} course={course} sessionId={index} />
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

export default AttendanceCourseCard;