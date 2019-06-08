import React, { Component } from 'react';
import { Card, Button, CardContent, CardActions, Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

import styles from './EditArias.module.scss';
import { getArias, updateAria } from '../../../core/api/arias';
import EditAriaForm from '../../../Forms/EditAriaForm/EditAriaForm';
import { getCourses, updateCourse } from '../../../core/api/courses';
import CustomButton from '../../../core/components/CustomButton/CustomButton';

class EditArias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arias: [],
            open: false,
            selectedAria: null,
            allCoursesLength: 0,
            addNewAria: false,
            isSubmiting: false
        }
    }

    componentDidMount() {
        this.getAllArias();
    }

    getAllArias = () => {
        getArias().then(response => {
            this.setState({ arias: Object.values(response.data) });
        })
    }

    handleEditAria = async (aria) => {
        await getCourses().then(response => {
            const allCoursesLength = response.data.length;
            const ariaCourses = aria.coursesIds ? response.data.filter(course => aria.coursesIds.includes(course.courseId)) : [];
            aria.courses = ariaCourses;
            console.log(aria.courses)
            this.setState({ selectedAria: aria, open: true, allCoursesLength });
        })
    }

    handleAddNewAria = () => {
        this.setState({ addNewAria: true });
    }

    handleClose = () => {
        this.setState({ selectedAria: null, open: false, addNewAria: false });
    }

    handleSubmitEditAria = async (newValues) => {
        this.setState({ isSubmiting: true });
        const { arias } = this.state;
        if (newValues.courses) {
            await newValues.courses.forEach(async course => {
                delete course.trainers;
                await updateCourse(course).then(response => {});
            })
            newValues.coursesIds = newValues.courses.map(course => course.courseId);
            delete newValues.courses;
        }
        
        if (!newValues.ariaId && newValues.ariaId !== 0) {
            newValues.ariaId = arias.length;
        }
        updateAria(newValues).then(response => { 
            this.getAllArias(); 
            this.handleClose();
            this.setState({ isSubmiting: false });
        });
        
    }

    render() {
        const { arias, open, selectedAria, allCoursesLength, addNewAria, isSubmiting } = this.state;
        const defaultAria = {
            courses: [],
            coursesIds: [],
            description: "",
            image: "/nothing2.jpg",
            name: ''
        }
        return (
            <>
                <div className={styles.actions}>
                    <h2>Arii</h2>
                    <CustomButton onClick={this.handleAddNewAria}>
                        <Add />
                        Adauga arie
                    </CustomButton>
                </div>
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
                        <DialogTitle>Editeaza aria {selectedAria && selectedAria.name}</DialogTitle>
                        <DialogContent><EditAriaForm formValues={{...defaultAria, ...selectedAria}} isSubmiting={isSubmiting} onSubmit={this.handleSubmitEditAria} allCoursesLength={allCoursesLength}/></DialogContent>
                    </Dialog>
                    <Dialog open={addNewAria} onBackdropClick={this.handleClose} fullWidth maxWidth="md">
                        <DialogTitle>Adauga o noua arie</DialogTitle>
                        <DialogContent><EditAriaForm formValues={defaultAria} onSubmit={this.handleSubmitEditAria} isSubmiting={isSubmiting} allCoursesLength={allCoursesLength}/></DialogContent>
                    </Dialog>
                </div>
            </>
        );
    }
}

export default EditArias;