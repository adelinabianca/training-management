import React, { Component } from 'react';

import styles from './Statistics.module.scss';
import { withFirebase } from '../../../../Firebase';

class Statistics extends Component {
    // coursesRef;

    constructor(props) {
        super(props);
        this.state = {
            // courses: []
        }
    }

    componentDidMount() {
        // const { firebase } = this.props;
        // this.coursesRef = firebase.courses();
        // this.coursesRef.on('value', snapshot => {
        //     this.setState({ courses: snapshot.val() });
        // })
    }

    componentWillUnmount() {
        // if(this.coursesRef) this.coursesRef.off();
    }

    render() {
        // const { courses } = this.state;
        return (
            <div className={styles.wrapper}>
                Statistics
            </div>
        );
    }
}

export default withFirebase(Statistics);