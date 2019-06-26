import React, { Component } from 'react';

import styles from './AttendanceComplete.module.scss';
import { withFirebase } from '../../../../Firebase';
import { Card, CardContent, IconButton, Collapse, Grid } from '@material-ui/core';
import AttendanceCourseCard from './AttendanceCourseCard';

// import CourseCard from './CourseCard';

class AttendanceComplete extends Component {
    coursesRef;

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount() {
        const { firebase } = this.props;
        this.coursesRef = firebase.courses();
        this.coursesRef.on('value', snapshot => {
            this.setState({ courses: snapshot.val() });
        })
    }

    componentWillUnmount() {
        if(this.coursesRef) this.coursesRef.off();
    }

    render() {
        const { courses } = this.state;
        return (
            <div className={styles.wrapper}>
                {courses.map(course => (
                    <AttendanceCourseCard key={course.courseId} course={course} />
                ))}
            </div>
        );
    }
}

export default withFirebase(AttendanceComplete);