import React, { Component } from 'react';
import { Card, Button, CardContent, CardActions, Dialog, DialogTitle, DialogContent } from '@material-ui/core';

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
            selectedAria: null
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
            const ariaCourses = response.data.filter(course => aria.coursesIds.includes(course.courseId));
            aria.courses = ariaCourses;
            this.setState({ selectedAria: aria, open: true });
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
        delete newValues.courses;
        updateAria(newValues).then(response => this.handleClose());
        
    }

    render() {
        const { arias, open, selectedAria } = this.state;
        return (
            <div className={styles.wrapper}>
                {arias.map(aria => (
                    <Card key={aria.ariaId} className={styles.ariaCard}>
                        <CardContent className={styles.cardContent}>
                            <h2>{aria.name}</h2>
                            <div className={styles.description}>{aria.description}</div>
                        </CardContent>
                        <CardActions className={styles.cardActions}>
                            <Button className={styles.editBtn} onClick={() => this.handleEditAria(aria)}>Edit Aria</Button>
                        </CardActions>
                    </Card>
                ))}
                <Dialog open={open} onBackdropClick={this.handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Edit aria {selectedAria && selectedAria.name}</DialogTitle>
                    <DialogContent><EditAriaForm formValues={selectedAria} onSubmit={this.handleSubmitEditAria}/></DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default EditArias;