import React, { Component } from 'react';

import styles from './CourseDetails.module.scss';



class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const { description, trainers } = this.props;
        return (
            <div className={styles.wrapper}>
                {description}
            </div>
        );
    }
}

export default CourseDetails;