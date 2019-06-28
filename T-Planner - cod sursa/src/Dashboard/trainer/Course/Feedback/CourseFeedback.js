import React, { Component } from 'react';

import styles from './CourseFeedback.module.scss';
import { withFirebase } from '../../../../Firebase';
import WordCloud from '../../../../core/components/WordCloud/WordCloud';

class CourseFeedback extends Component {
    courseFeedbackRef;

    constructor(props) {
        super(props);
        this.state = {
            feedback: []
        }
    }

    componentDidMount() {
        const { firebase, courseId } = this.props;
        this.courseFeedbackRef = firebase.courseFeedback(courseId);
        this.courseFeedbackRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({ feedback: snapshot.val() });
            }
        })
    }

    
    componentWillUnmount() {
        if(this.courseFeedbackRef) this.courseFeedbackRef.off();
    }

    

    render() {
        const { feedback } = this.state;

        if (!feedback.length) {
            return <div>Momentan nu s-a primit feedback</div>
        }
        const words = feedback.map(message => message.feedback);
        return (
            <div className={styles.wrapper}>
                <div className={styles.wordCloudContainer}>
                    <WordCloud words={words} />
                </div>
                <div className={styles.messagesContainer}>
                    {feedback.map((message, index) => (
                        <div className={[styles.container, index % 2 ? styles.isOdd : ''].join(' ')} key={message.feedback+index}>
                            <div className={styles.message}>{message.feedback}</div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withFirebase(CourseFeedback);