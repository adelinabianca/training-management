import React from 'react';

import styles from './CourseDetails.module.scss';

const CourseDetails =(props) => {
    const { description } = props;
    return (
        <div className={styles.wrapper}>
            {description}
        </div>
    );

}

export default CourseDetails;