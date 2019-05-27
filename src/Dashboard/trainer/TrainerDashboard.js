import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from './TrainerDashboard.module.scss';
// import WhatDoYouWantToDo from './admin/Main/WhatDoYouWantToDo';
// import EditArias from './admin/EditArias/EditArias';
// import UsersList from './admin/Users/UsersList';

class TrainerDashboard extends Component {
    render() {
        return (
            <div className={styles.dashboardWrapper}>
               <div className={styles.sidebar}>
                {/* <div>Aplicanti</div>
                <div>Cursuri</div> */}
               </div>
               <div className={styles.content}>
                  trainer Dashboard content
               </div>
            </div>
        )
    }
}

export default TrainerDashboard;