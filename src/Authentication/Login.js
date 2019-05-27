import React, { Component } from 'react';
import {
  Card, InputLabel, Button, TextField, CardContent
} from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
// import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styles from './Login.module.scss';
import OptionButton from '../core/components/OptionButton/OptionButton';
import { withFirebase } from '../Firebase';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
@inject('userStore')
@observer
class Login extends Component {
//   static defaultProps = {
//     history: {}
//   };

//   static propTypes = {
//     history: PropTypes.object
//   };

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    selectedAuthOption: 0
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOnLogin = () => {
    const { firebase, history } = this.props;
    const { username, password } = this.state;
    firebase.loginUserWithEmailAndPassword(username, password)
    .then(authUser => {
      // console.log(authUser);
      // setAuthenticatedUser(authUser)
      history.push('/main');
    })
    .catch(error => {
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
      }
    })
  };

  handleCreateAccount = () => {
    const { username, password, fullname } = this.state;
    const { firebase, history } = this.props;
    const roles = [];
    firebase.createUserWithEmailAndPassword(username, password)
    .then(authUser => {
      return firebase.user(authUser.user.uid).set({
        username: fullname,
        email: username,
        roles: ['admin']
      })
    })
    .then(authUser => {
      // console.log(authUser);
      history.push('/main');
    })
    .catch(error => console.log(error))
  }

  handleOptionClick = (value) => {
    this.setState({ selectedAuthOption: value });
  }

  renderContent = () => {
    const { username, password, fullname, selectedAuthOption, confirmPassword } = this.state;
    if (selectedAuthOption === 0) {
      return (
        <>
          <h1>Login</h1>
          <div className={styles.subtitle}>Find out details and apply on trainings.</div>
          <InputLabel className={styles.formLabel}>EMAIL ADRESS</InputLabel>
          <TextField
                name="username"
                margin="dense"
                variant="outlined"
                value={username}
                onChange={this.handleInputChange}
                className={styles.inputContainer} />
          <InputLabel className={styles.formLabel}>PASSWORD</InputLabel>
          <TextField
              name="password"
              margin="dense"
              variant="outlined"
              type="password"
              value={password}
              onChange={this.handleInputChange}
              className={styles.inputContainer} />
          <Button className={styles.loginBtn} onClick={this.handleOnLogin}>Login</Button>
        </>
      )
    }
    return (
      <>
        <h1>Create an account</h1>
        <div className={styles.subtitle}>And start learning</div>
        <InputLabel className={styles.formLabel}>FULL NAME</InputLabel>
        <TextField
              name="fullname"
              margin="dense"
              variant="outlined"
              value={fullname}
              onChange={this.handleInputChange}
              className={styles.inputContainer} />
        <InputLabel className={styles.formLabel}>EMAIL ADRESS</InputLabel>
        <TextField
              name="username"
              margin="dense"
              variant="outlined"
              value={username}
              onChange={this.handleInputChange}
              className={styles.inputContainer} />
        <InputLabel className={styles.formLabel}>PASSWORD</InputLabel>
        <TextField
            name="password"
            margin="dense"
            variant="outlined"
            type="password"
            value={password}
            onChange={this.handleInputChange}
            className={styles.inputContainer} />
            <InputLabel className={styles.formLabel}>CONFIRM PASSWORD</InputLabel>
        <TextField
            name="confirmPassword"
            margin="dense"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={this.handleInputChange}
            className={styles.inputContainer} />
        <Button className={styles.loginBtn} onClick={this.handleCreateAccount}>Sign up</Button>
      </>
    )
  }

  render() {
    const { selectedAuthOption } = this.state;
    return (
      <Card className={styles.container}>
        <CardContent className={styles.cardContent}>
          <div className={styles.authOptions}>
            <OptionButton 
              title="Login" 
              subtitle="Login to start learning"
              isSelected={selectedAuthOption === 0}
              onSelect={() => this.handleOptionClick(0)}
              icon={<AccountCircleOutlined size="large" variant="outlined" />}
              />
            <OptionButton 
              title="Sign up" 
              subtitle="Create an account to explore all features"
              isSelected={selectedAuthOption === 1}
              onSelect={() => this.handleOptionClick(1)}
              icon={<AccountCircleOutlined size="large" variant="outlined" />}
              />
          </div>
          <div className={styles.content}>
            {this.renderContent()}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withFirebase(Login);