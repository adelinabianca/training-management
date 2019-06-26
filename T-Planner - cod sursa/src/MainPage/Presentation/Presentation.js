import React, { Component } from 'react';

import styles from './Presentation.module.scss';
class Presentation extends Component {
    render() {
        return (
            <div className={styles.container}>
              <div className={styles.presentation}>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
              <div className={styles.content}>
                <h2 className={styles.h2}>FII PRACTIC</h2>
                <h3 className={styles.h3}>We learn to teach you</h3>
                <h4 className={styles.h4}>1 - 31 Martie 2020 </h4>
              </div>
            </div>
          )
    }
};

export default Presentation;
