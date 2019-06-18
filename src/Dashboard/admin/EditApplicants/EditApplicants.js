import React, { Component } from 'react';

import styles from './EditApplicants.module.scss';
import { withFirebase } from '../../../Firebase';
import CourseCard from './CourseCard';

class EditApplicants extends Component {
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
        if(this.attendeesRef) this.attendeesRef.off();
    }

    render() {
        const { courses } = this.state;
        return (
            <div className={styles.wrapper}>
                {courses.map(course => (
                  <CourseCard key={course.courseId} course={course} />
                ))}
            </div>
        );
    }
}

export default withFirebase(EditApplicants);