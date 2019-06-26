import React, { Component } from 'react';

import styles from './ParticipantCourseFeedback.module.scss';
import FeedbackForm from '../../../../Forms/FeedbackForm/FeedbackForm';
import { updateCourse } from '../../../../core/api/courses';

class ParticipantCourseFeedback extends Component {
    sendFeedback = (newValues) => {
        const { course } = this.props;
        course.feedback = course.feedback ? [...course.feedback, newValues] : [newValues];
        updateCourse(course);
    }


    render() {
        const formValues = { feedback: '' };
        return (
            <div className={styles.wrapper}>
                <FeedbackForm formValues={formValues} onSubmit={this.sendFeedback}/>
            </div>
        );
    }
}

export default ParticipantCourseFeedback;