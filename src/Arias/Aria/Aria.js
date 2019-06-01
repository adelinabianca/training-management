import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, CardContent, CardHeader, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import styles from './Aria.module.scss';
import { getAria } from '../../core/api/arias';
import { Breadcrumbs } from '../../core/components/Breadcrumbs/Breadcrumbs';
import ApplyForm from '../../Forms/ApplyForm/ApplyForm';
import { getCourses } from '../../core/api/courses';

@inject('ariasStore', 'coursesStore')
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
                value: 'main',
                displayName: 'Home',
                child: {
                    value: responseAria.ariaId,
                    displayName: responseAria.name
                }
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
        crumbs.child.child = {
            value: course.courseId,
            displayName: course.name
        }
        const applyFormQuestions = course.applyFormQuestions || {};
        this.setState({ crumbs, selectedCourse: course, questions: Object.values(applyFormQuestions) });
    }

    handleCrumbClick = (value) => {
        const { history } = this.props;
        if (value === 'main') {
            history.push('/');
            return;
        }
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

    handleFormSubmit = (newValues) => {
        // console.log(newValues)
        this.setState({ open: false })
    }

    render() {
        const { selectedAria, crumbs, selectedCourse, open, formValues, ariaCourses } = this.state;
        return (
            <Card className={styles.ariaCard}>
                <CardHeader title={selectedAria && (<Breadcrumbs crumbs={crumbs} handleClick={this.handleCrumbClick} />)}/>
                <CardContent className={styles.cardContent}>
                    <div className={styles.coursesButtons}>
                        {selectedAria && ariaCourses.map(course => (
                            <Button 
                                className={selectedCourse && course.courseId === selectedCourse.courseId ? styles.selectedCourse : ''} 
                                key={course.courseId} 
                                onClick={() => this.handleCourseClick(course)}>{course.name}</Button>
                        ))}
                    </div>
                    <div className={styles.courseContent}>
                        {selectedCourse && (
                            <div className={styles.contentHeader}>
                                <span>Logo firma</span>
                                <Button onClick={this.handleApply}>Aplica</Button>
                            </div>
                        )}
                        {!selectedCourse ? selectedAria && selectedAria.description : selectedCourse.description}
                        {/* {selectedCourse && selectedCourse.trainers && selectedCourse.trainers.map(trainer => <div key={trainer.uid}>{trainer.username}</div>)} */}
                    </div>
                </CardContent>
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
            </Card>
        )
    }
};

export default Aria;