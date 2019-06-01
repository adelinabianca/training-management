import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { Card, Button, CardContent, CardActions, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

import styles from './Course.module.scss';
import { getCourse, updateCourse } from '../../../core/api/courses';
import EditApplyForm from './EditApplyForm/EditApplyForm';
// import { getArias, updateAria } from '../../../core/api/arias';
// import EditAriaForm from '../../../Forms/EditAriaForm/EditAriaForm';
// import { getCourses, updateCourse } from '../../../core/api/courses';

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
            this.setState({ course: response.data });
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

    render() {
        const { course, tabValue } = this.state;
        return (
            <div className={styles.wrapper}>
                <h2>{course && course.name}</h2>
                <AppBar position="static" color="default">
                    <Tabs
                        value={tabValue}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab value={0} label="Formular de aplicare" />
                        <Tab value={1} label="Aplicanti" />
                        <Tab value={2} label="Membri" />
                        <Tab value={3} label="Prezente" />
                        <Tab value={4} label="Anunturi" />
                    </Tabs>
                </AppBar>
                {tabValue === 0 && <EditApplyForm questions={course && course.applyFormQuestions ? course.applyFormQuestions : ['']} handleFormSave={this.saveApplyFormQuestions} />}
                {tabValue === 1 && <div>Item Two</div>}
                {tabValue === 2 && <div>Item Three</div>}
                {tabValue === 3 && <div>Item Four</div>}
                {tabValue === 4 && <div>Item Five</div>}
            </div>
        );
    }
}

export default Course;