import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {  withStyles } from '@material-ui/core/styles';

import styles from './ParticipantCourse.module.scss';
import { getCourse, updateCourse } from '../../../core/api/courses';
import UserAttendance from './UserAttendance/UserAttendance';
// import EditApplyForm from './EditApplyForm/EditApplyForm';
// import Applicants from './Applicants/Applicants';
// import Members from './Members/Members';
// import Attendance from './Attendance/Attendance';

const CustomTabs = withStyles({
    root: {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    indicator: {
      backgroundColor: '#FFF',
    },
    scrollButtons: {
        color: '#FFF'
    }
})(Tabs);

const CustomTab = withStyles({
    root: {
      color: '#FFF'
    },
    selected: {
      color: '#FFF',
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
        console.log(user);
        const { course, activeSession } = this.state;
        const updatedCourse = {...course};
        if (activeSession) {
            const index = updatedCourse.attendance.findIndex(session => session.active)
            const updatedAttendees = activeSession.attendees ? [...activeSession.attendees, user.uid] : [user.uid];
            updatedCourse.attendance[index] = {...activeSession, attendees: updatedAttendees }
        }
        this.setState({ course: {...updatedCourse} });
        await updateCourse(updatedCourse);
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
                                <CustomTab value={0} label="Formular de aplicare" />
                                <CustomTab value={1} label="Aplicanti" />
                                <CustomTab value={2} label="Membri" />
                                <CustomTab value={3} label="Prezente" />
                                <CustomTab value={4} label="Anunturi" />
                            </CustomTabs>
                        </AppBar>
                    </div>
                    <div className={styles.cardBody}>
                        {tabValue === 0 && (
                            <div>Item Five</div>
                            // <EditApplyForm 
                            //     questions={course && course.applyFormQuestions ? course.applyFormQuestions : ['']} 
                            //     handleFormSave={this.saveApplyFormQuestions} />
                        )}
                        {tabValue === 1 && (
                            <div>Item Five</div>
                            // <Applicants 
                            //     applicants={course && course.applicants ? course.applicants : []} 
                            //     course={course}
                            //     onAcceptUser={this.acceptApplicant}
                            //     onRemoveUser={this.removeMember} />
                        )}
                        {tabValue === 2 && (
                            <div>Item Five</div>
                            // <Members 
                            //     members={course && course.members ? course.members : []} 
                            //     courseId={course.courseId} />
                        )}
                        {tabValue === 3 && (
                            <UserAttendance activeSession={activeSession} handleAttendance={this.setUserPresent} />
                            // <Attendance
                            //     members={course && course.members ? course.members : []} 
                            //     courseId={course.courseId}/>
                        )}
                        {tabValue === 4 && <div>Item Five</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ParticipantCourse;