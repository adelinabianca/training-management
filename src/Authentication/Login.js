import React, { Component } from 'react';
import {
  Card, InputLabel, Button, TextField, CardContent
} from '@material-ui/core';
import { CheckCircle, AccountCircleOutlined } from '@material-ui/icons';
// import PropTypes from 'prop-types';

import styles from './Login.module.scss';

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
    selectedAuthOption: 0
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOnLogin = () => {
    // const { history } = this.props;
    // history.push('/scopes');
  };

  handleOptionClick = (value) => {
    this.setState({ selectedAuthOption: value });
  }

  renderContent = () => {
    const { username, password, selectedAuthOption } = this.state;
    if (selectedAuthOption === 0) {
      return (
        <>
          <h1>Enter your credentials</h1>
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
          <Button className={styles.loginBtn}>Login</Button>
        </>
      )
    }
    return (
      <>
        <h1>Get started for free</h1>
        <div className={styles.subtitle}>Free forever. No credit card needed.</div>
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
        <Button className={styles.loginBtn}>Login</Button>
      </>
    )
  }

  render() {
    const { selectedAuthOption } = this.state;
    return (
      <Card className={styles.container}>
        <CardContent className={styles.cardContent}>
          <div className={styles.authOptions}>
            <div className={[styles.option, selectedAuthOption===0 ? styles.isActive : ''].join(' ')} onClick={() => this.handleOptionClick(0)}>
              <AccountCircleOutlined size="large" variant="outlined" />
              <h4>Login</h4>
              <div className={styles.subtitle}>Login to start learning</div>
            </div>
            <div className={[styles.option, selectedAuthOption===1 ? styles.isActive: ''].join(' ')} onClick={() => this.handleOptionClick(1)}>
              <AccountCircleOutlined size="large" variant="outlined" />
              <h4>Sign up</h4>
              <div className={styles.subtitle}>Create an account to explore all features</div>
            </div>
          </div>
          <div className={styles.content}>
            {this.renderContent()}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default Login;