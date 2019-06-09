import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {  withStyles } from '@material-ui/core/styles';

import styles from './Course.module.scss';
import { getCourse, updateCourse } from '../../../core/api/courses';
import { getUser, updateUser } from '../../../core/api/users';
import EditApplyForm from './EditApplyForm/EditApplyForm';
import Applicants from './Applicants/Applicants';
import Members from './Members/Members';
import Attendance from './Attendance/Attendance';

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

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            tabValue: 0
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
        const { location: { pathname } } =  this.props;
        const startIndex = pathname.lastIndexOf('/');
        const courseId = pathname.substr(startIndex + 1);
        await getCourse(courseId).then(response => {
            this.setState({ course: response.data, tabValue: 0 });
        })
    }

    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    saveApplyFormQuestions = async (questions) => {
        const { course } = this.state;
        course.applyFormQuestions = questions;
        this.setState({ course: {...course} })
        await updateCourse(course).then(response => {})
    }

    acceptApplicant = async (acceptedUser) => {
        const { course } = this.state;

        await getUser(acceptedUser.uid).then(async response => {
            const user = response.data;
            const participantCourses = user.participantCoursesIds ? [...user.participantCoursesIds, course.courseId] : [course.courseId];
            const updatedUser = { ...response.data, participantCoursesIds: participantCourses}
            await updateUser(updatedUser).then(res => {})
        });

        const members = course.members ? [...course.members, acceptedUser.uid] : [acceptedUser.uid];
        const updatedCourse = {...course, members};
        this.setState({ course: updatedCourse });
        await updateCourse(updatedCourse).then(() => {});
    }

    removeMember = async (removedUser) => {
        const { course } = this.state;

        course.members = [...course.members].filter(userUid => userUid !== removedUser.uid)
        this.setState({ course: {...course}});
        await updateCourse(course).then(() => {});

        await getUser(removedUser.uid).then(async response => {
            const user = response.data;
            const participantCourses =[...user.participantCoursesIds].filter(courseID => courseID !== course.courseId);
            const updatedUser = { ...response.data, participantCoursesIds: participantCourses}
            await updateUser(updatedUser).then(res => {})
        });
    }

    render() {
        const { course, tabValue } = this.state;
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
                            <EditApplyForm 
                                questions={course && course.applyFormQuestions ? course.applyFormQuestions : ['']} 
                                handleFormSave={this.saveApplyFormQuestions} />
                        )}
                        {tabValue === 1 && (
                            <Applicants 
                                applicants={course && course.applicants ? course.applicants : []} 
                                course={course}
                                onAcceptUser={this.acceptApplicant}
                                onRemoveUser={this.removeMember} />
                        )}
                        {tabValue === 2 && (
                            <Members 
                                members={course && course.members ? course.members : []} 
                                courseId={course.courseId}
                                onRemoveUser={this.removeMember} />
                        )}
                        {tabValue === 3 && (
                            <Attendance
                                members={course && course.members ? course.members : []} 
                                courseId={course.courseId}/>
                        )}
                        {tabValue === 4 && <div>Item Five</div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;