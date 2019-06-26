import React, { Component } from 'react';

import styles from './Session.module.scss';
import { withFirebase } from '../../../../Firebase';
import { Card, CardContent, IconButton, Collapse, Grid } from '@material-ui/core';
import AttendanceCourseCard from './AttendanceCourseCard';

// import CourseCard from './CourseCard';

class Session extends Component {
    // coursesRef;
    attendeesRef;

    constructor(props) {
        super(props);
        this.state = {
            attendees: []
        }
    }

    componentDidMount() {
        const { firebase, course: { courseId, attendance }, session } = this.props;

        const sessionId = attendance.findIndex(att => att.uniqueCode === session.uniqueCode && att.date === session.date);
        
        this.attendeesRef = firebase.attendees(courseId, sessionId);
        this.attendeesRef.on('value', snapshot => {
            if (snapshot.val()) {
                this.setState({ attendees: snapshot.val() });
            }
        })
    }

    componentWillUnmount() {
        if(this.attendeesRef) this.attendeesRef.off();
    }

    render() {
        const { attendees } = this.state;
        return (
            <div className={styles.wrapper}>
                {attendees.map(user => (
                    <div key={user.uid}>
                        {user.username}
                    </div>
                ))}
            </div>
        );
    }
}

export default withFirebase(Session);