import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from './Dashboard.module.scss';
import WhatDoYouWantToDo from './admin/Main/WhatDoYouWantToDo';
import EditArias from './admin/EditArias/EditArias';


class Dashboard extends Component {
    render() {
        return (
            <div className={styles.dashboardWrapper}>
               <div className={styles.sidebar}>
                {/* <div>Aplicanti</div>
                <div>Cursuri</div> */}
               </div>
               <div className={styles.content}>
                  <BrowserRouter>
                    <Switch>
                        <Route exact path="/dashboard" component={WhatDoYouWantToDo} />
                        <Route exact path="/dashboard/edit" component={EditArias} />
                    </Switch>
                  </BrowserRouter>
               </div>
            </div>
        )
    }
}

export default Dashboard;