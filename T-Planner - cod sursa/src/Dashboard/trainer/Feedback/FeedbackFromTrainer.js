import React, { Component } from 'react';
import FeedbackForm from '../../../Forms/FeedbackForm/FeedbackForm';
import { postFeedbackFromTrainer } from '../../../core/api/feedback';


class FeedbackFromTrainer extends Component {
    sendFeedback = async (newValues) => {
        await postFeedbackFromTrainer(newValues);
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

export default FeedbackFromTrainer;