import React, { Component } from 'react';
import styles from './Dashboard.module.scss';

class Dashboard extends Component {
    render() {
        return (
            <div className={styles.dashboardWrapper}>
               <div className={styles.sidebar}>
                <div>Aplicanti</div>
                <div>Cursuri</div>
               </div>
            </div>
        )
    }
}

export default Dashboard;