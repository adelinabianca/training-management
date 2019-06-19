import React, { Component } from 'react';

import styles from './CourseFeedback.module.scss';
import { withFirebase } from '../../../../Firebase';

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
        
        return (
            <div className={styles.wrapper}>
                {feedback.map((message, index) => (
                    <div className={[styles.container, index%2 ? styles.isOdd : ''].join(' ')} key={message.feedback+index}>
                        <div className={styles.message}>{message.feedback}</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default withFirebase(CourseFeedback);