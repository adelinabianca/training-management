import React, { Component } from 'react';
import { Card, Button, CardContent, CardActions, Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

import styles from './EditArias.module.scss';
import { getArias, updateAria } from '../../../core/api/arias';
import EditAriaForm from '../../../Forms/EditAriaForm/EditAriaForm';
import { getCourses, updateCourse } from '../../../core/api/courses';

class EditArias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arias: [],
            open: false,
            selectedAria: null,
            allCoursesLength: 0
        }
    }

    componentDidMount() {
        getArias().then(response => {
            // console.log(response.data)
            // const arias = Object.values(response.data).map((aria, index) => ({ ...aria, id: index}))
            this.setState({ arias: Object.values(response.data) });
        })
    }

    handleEditAria = async (aria) => {
        await getCourses().then(response => {
            const ariaCourses = aria.coursesIds ? response.data.filter(course => aria.coursesIds.includes(course.courseId)) : [];
            aria.courses = ariaCourses;
            this.setState({ selectedAria: aria, open: true, allCoursesLength: response.data.length });
        })
    }

    handleClose = () => {
        this.setState({ selectedAria: null, open: false });
    }

    handleSubmitEditAria = async (newValues) => {
        await newValues.courses.forEach(async course => {
            delete course.trainers;
            await updateCourse(course).then(respones => {});
        })
        newValues.coursesIds = newValues.courses.map(course => course.courseId);
        delete newValues.courses;
        updateAria(newValues).then(response => this.handleClose());
        
    }

    render() {
        const { arias, open, selectedAria, allCoursesLength } = this.state;
        return (
            <div className={styles.wrapper}>
                {arias.map(aria => (
                    <div key={aria.ariaId} className={styles.card}>
                        <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                            <h3>{aria.name}</h3>
                        </div>
                        
                        <div className={styles.cardBody}>
                            <div className={styles.description}>{aria.description}</div>
                            <Button className={styles.editBtn} onClick={() => this.handleEditAria(aria)}>Edit Aria</Button>
                        </div>
                    </div>
                ))}
                <Dialog open={open} onBackdropClick={this.handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Edit aria {selectedAria && selectedAria.name}</DialogTitle>
                    <DialogContent><EditAriaForm formValues={selectedAria} onSubmit={this.handleSubmitEditAria} allCoursesLength={allCoursesLength}/></DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default EditArias;