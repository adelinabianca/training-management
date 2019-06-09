import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, CardContent, CardHeader, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles';

import styles from './Aria.module.scss';
import { getAria } from '../../core/api/arias';
import { Breadcrumbs } from '../../core/components/Breadcrumbs/Breadcrumbs';
import ApplyForm from '../../Forms/ApplyForm/ApplyForm';
import { getCourses, updateCourse } from '../../core/api/courses';
import { updateUser } from '../../core/api/users';
import CustomButton from '../../core/components/CustomButton/CustomButton';

@inject('ariasStore', 'coursesStore', 'sessionStore')
@observer
class Aria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAria: null,
            selectedCourse: null,
            ariaCourses: [],
            crumbs: {},
            open: false,
            questions: []
        }
    }

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        const { ariasStore: { setSelectedAria } } = this.props;
        
        const { location: { pathname } } =  this.props;
        const ariaId = pathname.substr(6);
        await getAria(ariaId).then(async response => {
            const responseAria = response.data;
            setSelectedAria(responseAria);
            const crumbs = {
                value: responseAria.ariaId,
                displayName: responseAria.name
            }
            await getCourses().then(res => {
                const ariaCourses = this.filterCourses(res.data, responseAria);
        
                this.setState({ ariaCourses })
            })
            this.setState({ selectedAria: responseAria, crumbs, selectedCourse: null });
        });
        
        
        
    }

    filterCourses = (allCourses, selectedAria) => {
        return allCourses.filter(course => selectedAria.coursesIds.includes(course.courseId));
    }


    handleCourseClick = course => {
        const { crumbs } = this.state;
        crumbs.child = {
            value: course.name,
            displayName: course.name
        }
        const applyFormQuestions = course.applyFormQuestions || {};
        this.setState({ crumbs, selectedCourse: course, questions: Object.values(applyFormQuestions) });
    }

    handleCrumbClick = (value) => {
        if (typeof value !== 'string') {
            this.init();
        }
    }

    handleApply = () => {
        const { questions } = this.state;
        const values = [...questions];
        const formValues = {};
        values.map(question => formValues[question] = '');
        this.setState({ open: true, formValues: formValues })
    }

    handleDialogClose = () => {
        this.setState({ open: false });
    }

    handleFormSubmit = async (newValues) => {
        const { sessionStore: { authUser } } = this.props;
        const { selectedCourse } = this.state;
        
        if (!authUser.applications) {
            authUser.applications = [{ courseId: selectedCourse.courseId, answers: newValues }]
        } else {
            authUser.applications = [...authUser.applications, { courseId: selectedCourse.courseId, answers: newValues }]
        }
        await updateUser(authUser).then(resp => {})

        if (!selectedCourse.applicants) {
            selectedCourse.applicants = [authUser.uid]
        } else {
            selectedCourse.applicants = [...selectedCourse.applicants, authUser.uid]
        }
        await updateCourse(selectedCourse).then(res => {})

        this.setState({ open: false, selectedCourse })
    }

    render() {
        const { selectedAria, crumbs, selectedCourse, open, formValues, ariaCourses } = this.state;
        
        return (
            <div className={styles.cardWrapper}>
                <div className={styles.tabsContainer}>
                    {selectedAria && ariaCourses.map(course => (
                        <Button 
                            className={selectedCourse && course.courseId === selectedCourse.courseId ? styles.selectedCourse : ''} 
                            key={course.courseId} 
                            onClick={() => this.handleCourseClick(course)}>{course.name}</Button>
                    ))}
                </div>
                <div className={styles.content}>
                    <div>{selectedAria && (<Breadcrumbs crumbs={crumbs} handleClick={this.handleCrumbClick} />)}</div>
                    <div className={styles.courseContent}>
                        {selectedCourse && (
                            <div className={styles.contentHeader}>
                                <span>Logo firma</span>
                                <CustomButton onClick={this.handleApply}>Aplica</CustomButton>
                            </div>
                        )}
                        {!selectedCourse ? selectedAria && selectedAria.description : selectedCourse.description}
                        {/* {selectedCourse && selectedCourse.trainers && selectedCourse.trainers.map(trainer => <div key={trainer.uid}>{trainer.username}</div>)} */}
                    </div>
                </div>
                <Dialog 
                    open={open} 
                    onClose={this.handleDialogClose}
                    onBackdropClick={this.handleDialogClose}
                    fullWidth
                    maxWidth="md" >
                    <DialogTitle className={styles.formTitle}>{selectedCourse && selectedCourse.name}</DialogTitle>
                    <DialogContent><ApplyForm formValues={formValues} onSubmit={this.handleFormSubmit} /></DialogContent>
                    {/* <DialogActions><Button>Submit</Button></DialogActions> */}
                </Dialog>
            </div>
        )
    }
};

const VerticalTabs = withStyles(theme => ({
    flexContainer: {
      flexDirection: 'column'
    },
    indicator: {
      display: 'none',
    }
  }))(Tabs)
  
  const MyTab = withStyles(theme => ({
    selected: {
      color: 'tomato',
      borderLeft: '2px solid tomato'
    }
  }))(Tab);

export default Aria;