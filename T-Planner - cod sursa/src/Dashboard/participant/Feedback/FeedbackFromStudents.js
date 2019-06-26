import React, { Component } from 'react';
import FeedbackForm from '../../../Forms/FeedbackForm/FeedbackForm';
import { postFeedbackFromParticipant } from '../../../core/api/feedback';


class FeedbackFromStudents extends Component {
    sendFeedback = async (newValues) => {
        await postFeedbackFromParticipant(newValues);
    }


    render() {
        const formValues = { feedback: '' };
        return (
            <div>
                <div></div>
                <FeedbackForm formValues={formValues} onSubmit={this.sendFeedback}/>
            </div>
        );
    }
}

export default FeedbackFromStudents;