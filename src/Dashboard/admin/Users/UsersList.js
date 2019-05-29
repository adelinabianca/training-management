import React, { Component } from 'react';
import { Button, Grid } from '@material-ui/core';

import styles from './UsersList.module.scss';
import { withFirebase } from '../../../Firebase';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            isLoading: false
        }
    }

    componentDidMount() {
        const { firebase, userStore: { userList, setUsers } } = this.props;
        if(!userList.length) {
            this.setState({ isLoading: true });
        }

        firebase.users().on('value', snapshot => {
            setUsers(snapshot.val());

            this.setState({ isLoading: false });
        });
    }

    componentWillUnmount() {
        const { firebase } = this.props;
        firebase.users().off();
    }

    promoteToTrainer = (user) => {
      const { firebase } = this.props;
      const existingRoles = user.roles ? [...user.roles] : [];
      firebase.user(user.uid).set({
        email: user.email,
        username: user.username,
        roles: [...existingRoles, 'trainer']
      })
    }

    promoteToAdmin = (user) => {
      const { firebase } = this.props;
      
      firebase.user(user.uid).set({
        email: user.email,
        username: user.username,
        roles: [...user.roles, 'admin']
      })
    }

    render() {
        const { userStore: { userList } } = this.props;
        const { isLoading } = this.state;

        const users = userList;

        return (
          <div>
            <h2>Users</h2>
            {isLoading && <div>Loading ...</div>}
            <ul>
              <li>
                <Grid container>
                  <Grid item xs={4}><span><strong>ID</strong></span></Grid>
                  <Grid item xs={2}><span><strong>E-mail</strong></span></Grid>
                  <Grid item xs={2}><span><strong>Username</strong></span></Grid>
                  <Grid item xs={2}><span><strong>Roles</strong></span></Grid>
                  <Grid item xs={2}><span><strong>Actions</strong></span></Grid>
                </Grid>
              </li>
              {users && users.map(user => {
                return (
                <li key={user.uid}>
                  <Grid container>
                    <Grid item xs={4}><span>{user.uid}</span></Grid>
                    <Grid item xs={2}><span>{user.email}</span></Grid>
                    <Grid item xs={2}><span>{user.username}</span></Grid>
                    <Grid item xs={2}><span>{user.roles && user.roles.join(' ')}</span></Grid>
                    <Grid item xs={2}>
                      <span>
                        {(!user.roles || !user.roles.includes('trainer')) && (<Button onClick={() => this.promoteToTrainer(user)}>Promote to trainer</Button>)}
                        {(!user.roles || !user.roles.includes('admin')) && (<Button onClick={() => this.promoteToAdmin(user)}>Promote to admin</Button>)}
                      </span>
                    </Grid>
                  </Grid>
                </li>
              )})}
            </ul>
          </div>
        )
    }
}

export default compose(
    withFirebase,
    inject('userStore'),
    observer,
  )(UsersList);