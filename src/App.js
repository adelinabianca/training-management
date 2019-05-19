import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider, observer } from 'mobx-react';

import styles from './App.module.scss';
import NavigationBar from './NavigationBar/NavigationBar';
import MainPage from './MainPage/MainPage';
import Arias from './Arias/Arias';
import Login from './Authentication/Login';
import Dashboard from './Dashboard/Dashboard';
import EditArias from './Dashboard/admin/EditArias/EditArias';
import { withFirebase } from './Firebase';
import userStore from './core/stores/userStore';

const Authentication = withFirebase(Login);

const stores = {
  userStore
}

const App = observer(() => {
  return (
    <div>
      <Provider {...stores}>
        <BrowserRouter>
          <NavigationBar />
          <div className={styles.content}>
              <Switch>
                <Redirect exact from="/" to="/main" />
                <Route exact path="/main" component={MainPage} />
                <Route exact path="/arii" component={Arias} />
                <Route exact path="/login" component={Authentication} />
                <Route exact path="/dashboard" component={Dashboard} />
                {/* <Route exact path="/dashboard/edit" component={EditArias} /> */}
              </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
})

export default App;
