import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {  withStyles } from '@material-ui/core/styles';

import styles from './ParticipantCourse.module.scss';
import { getCourse, updateCourse } from '../../../core/api/courses';
import UserAttendance from './UserAttendance/UserAttendance';
import CourseDetails from './CourseDetails/CourseDetails';
import ParticipantCourseFeedback from './Feedback/ParticipantCourseFeedback';

const CustomTabs = withStyles({
    root: {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    indicator: {
      backgroundColor: 'gray',
    },
    scrollButtons: {
        width: 0
    }
})(Tabs);

const CustomTab = withStyles({
    root: {
      color: 'gray'
    },
    selected: {
      color: 'gray',
    },
})(Tab);

class ParticipantCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            tabValue: 0,
            activeSession: null
        }
    }

    async componentDidMount() {
        await this.init()
    }

    async componentDidUpdate(prevProps) {
        const { location: { pathname } } =  this.props;
        if (pathname !== prevProps.location.pathname) {
            await this.init();
        }
    }

    init = async () => {
        const { match: { params: { courseId } } } =  this.props;

        await getCourse(courseId).then(response => {
            const course = response.data;
            let activeSession = null;
            if (course.attendance) {
                activeSession = course.attendance.find(session => session.active);
            }
            this.setState({ course, tabValue: 0, activeSession });
            
        })
    }

    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    setUserPresent = async (user) => {
        const { course, activeSession } = this.state;
        const updatedCourse = {...course};
        if (activeSession) {
            const index = updatedCourse.attendance.findIndex(session => session.active)
            const updatedAttendees = activeSession.attendees ? [...activeSession.attendees, { uid: user.uid, username: user.username}] : [{ uid: user.uid, username: user.username}];
            updatedCourse.attendance[index] = {...activeSession, attendees: updatedAttendees }
            this.setState({ activeSession: {...activeSession, attendees: updatedAttendees }});
        }
        this.setState({ course: {...updatedCourse} });
        await updateCourse(updatedCourse).then( () => {});
    }

    render() {
        const { course, tabValue, activeSession } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                        <h2>{course && course.name}</h2>
                        <AppBar position="static" color="default" className={styles.appBar}>
                            <CustomTabs
                                value={tabValue}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <CustomTab value={0} label="Detalii" />
                                <CustomTab value={1} label="Prezente" />
                                <CustomTab value={2} label="Anunturi" />
                                <CustomTab value={3} label="Feedback" />
                            </CustomTabs>
                        </AppBar>
                    </div>
                    <div className={styles.cardBody}>
                        {tabValue === 0 && (
                            <CourseDetails description={course ? course.description : ''} />
                        )}
                        {tabValue === 1 && (
                            <UserAttendance activeSession={activeSession} handleAttendance={this.setUserPresent} />
                        )}
                        {tabValue === 2 && <div>Anunturi</div>}
                        {tabValue === 3 && <ParticipantCourseFeedback course={course}/> }
                    </div>
                </div>
            </div>
        );
    }
}

export default ParticipantCourse;