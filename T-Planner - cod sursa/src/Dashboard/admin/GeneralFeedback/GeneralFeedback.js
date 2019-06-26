import React, { Component } from 'react';

import styles from './GeneralFeedback.module.scss';
import { withFirebase } from '../../../Firebase';

class GeneralFeedback extends Component {
    feedbackRef;

    constructor(props) {
        super(props);
        this.state = {
            feedback: []
        }
    }

    componentDidMount() {
        const { firebase } = this.props;
        this.feedbackRef = firebase.feedback();
        this.feedbackRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                this.setState({ feedback: snapshot.val() });
            }
        })
    }

    
    componentWillUnmount() {
        if(this.feedbackRef) this.feedbackRef.off();
    }

    

    render() {
        const { feedback } = this.state;

        if (!feedback) {
            return <div>Momentan nu s-a primit feedback</div>
        }
        
        const { fromTrainers, fromStudents } = feedback;
        return (
            <div className={styles.wrapper}>
                <h2>Feedback din partea trainerilor</h2>
                {fromTrainers ? Object.values(fromTrainers).map((message, index) => (
                    <div className={[styles.container, index%2 ? styles.isOdd : ''].join(' ')} key={message.feedback+index}>
                        <div className={styles.message}>{message.feedback}</div>
                    </div>
                )): <div>Momentan nu s-a primit feedback din partea trainerilor</div>}
                <h2>Feedback din partea studentilor</h2>
                {fromStudents ? Object.values(fromStudents).map((message, index) => (
                    <div className={[styles.container, index%2 ? styles.isOdd : ''].join(' ')} key={message.feedback+index}>
                        <div className={styles.message}>{message.feedback}</div>
                    </div>
                )): <div>Momentan nu s-a primit feedback din partea studentilor</div>}
            </div>
        )
    }
}

export default withFirebase(GeneralFeedback);