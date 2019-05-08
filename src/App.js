import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import styles from './App.module.scss';
import NavigationBar from './NavigationBar/NavigationBar';
import MainPage from './MainPage/MainPage';
import Arias from './Arias/Arias';
import Login from './Authentication/Login';
import Dashboard from './Dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <div className={styles.content}>
            <Switch>
              <Redirect exact from="/" to="/main" />
              <Route exact path="/main" component={MainPage} />
              <Route exact path="/arii" component={Arias} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
