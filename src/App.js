import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'mobx-react';

import styles from './App.module.scss';
import NavigationBar from './NavigationBar/NavigationBar';
import MainPage from './MainPage/MainPage';
import Login from './Authentication/Login';
import userStore from './core/stores/userStore';
import sessionStore from './core/stores/sessionStore';
import messagesStore from './core/stores/messagesStore';
import ariasStore from './core/stores/ariasStore';
import coursesStore from './core/stores/coursesStore';
import drawerStore from './core/stores/drawerStore';
import Aria from './Arias/Aria/Aria';
import { withAuthentication } from './Firebase/Session';
import AdminDashboard from './Dashboard/admin/AdminDashboard';
import TrainerDashboard from './Dashboard/trainer/TrainerDashboard';
import ParticipantDashboard from './Dashboard/participant/ParticipantDashboard';

const stores = {
  userStore,
  sessionStore,
  messagesStore,
  ariasStore,
  coursesStore,
  drawerStore
}

const PrivateAdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (sessionStore.authUser && sessionStore.authUser.roles && sessionStore.authUser.roles.includes('admin')) {
        return <Component {...props} />;
      }

      return (
        <Redirect to={{
          pathname: '/main',
          state: { from: props.location }
        }} />
      );
    }} />
);

const PrivateTrainerRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (sessionStore.authUser && sessionStore.authUser.roles && sessionStore.authUser.roles.includes('trainer')) {
        return <Component {...props} />;
      }

      return (
        <Redirect to={{
          pathname: '/main',
          state: { from: props.location }
        }} />
      );
    }} />
);

class App extends Component {
  render() {
    return (
      <>
        <Provider {...stores}>
          <BrowserRouter>
            <NavigationBar />
            <div className={styles.content}>
                <Switch>
                  <Redirect exact from="/" to="/main" />
                  <Route exact path="/main" component={MainPage} />
                  <Route exact path="/login" component={Login} />
                  <PrivateAdminRoute path="/admin-dashboard" component={AdminDashboard} />
                  <PrivateTrainerRoute path="/trainer-dashboard" component={TrainerDashboard} />
                  <Route path="/participant-dashboard" component={ParticipantDashboard} />
                  <Route exact path="/aria/:ariaName" component={Aria} />
                </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default withAuthentication(App);
