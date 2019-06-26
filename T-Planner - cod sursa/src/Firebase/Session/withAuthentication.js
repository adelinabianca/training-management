import React from 'react';
import { inject, observer } from 'mobx-react';

import { withFirebase } from '../index';

const withAuthentication = Component => {
  @inject('sessionStore')
  @observer
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      const { sessionStore } = this.props;
      sessionStore.setAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount() {
      const { firebase, sessionStore } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          sessionStore.setAuthUser(authUser);
        },
        () => {
          localStorage.removeItem('authUser');
          sessionStore.setAuthUser(null);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return withFirebase(WithAuthentication);

};

export default withAuthentication;