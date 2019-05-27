import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Card, CardContent, CardHeader, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import styles from './Aria.module.scss';
import { getAria } from '../../core/api/arias';
import { Breadcrumbs } from '../../core/components/Breadcrumbs/Breadcrumbs';
import ApplyForm from '../../Forms/ApplyForm/ApplyForm';

@inject('ariasStore')
@observer
class Aria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAria: null,
            selectedCourse: null,
            crumbs: {},
            open: false,
            questions: ['Ce stii despre luna?', 'Ce zici de soare?', 'Cum e vremea?', 'Ce stii de luna?', 'Ce zici de tine?', 'Cum e css?', 'Ce stii despre html?', 'Ce zici de css?', 'Cum e javascript?', 'Ce stii despre react?', 'Ce zici de angular?', 'Cum e vue js?']
        }
    }

    async componentDidMount() {
        await this.init();
    }

    init = async () => {
        const { location: { pathname } } =  this.props;
        const ariaId = pathname.substr(6);
        await getAria(ariaId).then(response => {
            const crumbs = {
                value: 'main',
                displayName: 'Home',
                child: {
                    value: ariaId,
                    displayName: response.data.name
                }
            }
            this.setState({ selectedAria: response.data, crumbs, selectedCourse: null });
        });
    }


    handleCourseClick = course => {
        const { crumbs } = this.state;
        crumbs.child.child = {
            value: course.name,
            displayName: course.name
        }
        this.setState({ crumbs, selectedCourse: course });
    }

    handleCrumbClick = (value) => {
        const { history } = this.props;
        if (value === 'main') {
            history.push('/');
            return;
        }
        if (value.length < 2) {
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
        const { selectedAria, crumbs, selectedCourse, open, formValues } = this.state;
        return (
            <Card className={styles.ariaCard}>
                <CardHeader title={selectedAria && (<Breadcrumbs crumbs={crumbs} handleClick={this.handleCrumbClick} />)}/>
                <CardContent className={styles.cardContent}>
                    <div className={styles.coursesButtons}>
                        {selectedAria && selectedAria.courses.map(course => (
                            <Button className={course === selectedCourse ? styles.selectedCourse : ''} key={course.name} onClick={() => this.handleCourseClick(course)}>{course.name}</Button>
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