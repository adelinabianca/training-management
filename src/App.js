import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import styles from './App.module.scss';
import NavigationBar from './NavigationBar/NavigationBar';
import MainPage from './MainPage/MainPage';
import Arias from './Arias/Arias';

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
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
