import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

import styles from './UsersList.module.scss';
import { withFirebase } from '../../../Firebase';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { updateUser } from '../../../core/api/users';
import CustomButton from '../../../core/components/CustomButton/CustomButton';

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

    promoteToTrainer = async (user) => {
      const newRoles = [...user.roles, 'trainer']

      await updateUser({...user, roles: newRoles }).then(() => {});
    }

    promoteToAdmin = async (user) => {
      const newRoles = [...user.roles, 'admin']

      await updateUser({...user, roles: newRoles }).then(() => {});
    }

    removeTrainer = async (user) => { 
      const newRoles = user.roles.filter(role => role !== 'trainer');

      await updateUser({...user, roles: newRoles }).then(() => {});
    }

    removeAdmin = async (user) => { 
      const newRoles = user.roles.filter(role => role !== 'admin');

      await updateUser({...user, roles: newRoles }).then(() => {});
    }

    render() {
        const { userStore: { userList } } = this.props;
        const { isLoading } = this.state;

        const users = userList;
        if (isLoading) {
          return <div>Loading... </div>
        }

        return (
          <div className={styles.mainWrapper}>
            <div className={styles.card}>
              <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                <h2>Users</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    <Grid container>
                      <Grid item xs={2}><span><strong>ID</strong></span></Grid>
                      <Grid item xs={2}><span><strong>E-mail</strong></span></Grid>
                      <Grid item xs={2}><span><strong>Username</strong></span></Grid>
                      <Grid item xs={2}><span><strong>Roles</strong></span></Grid>
                      <Grid item xs={4}><span><strong>Actions</strong></span></Grid>
                    </Grid>
                  </li>
                  {users && users.map(user => {
                    return (
                    <li key={user.uid} className={styles.listItem}>
                      <Grid container>
                        <Grid item xs={2}><span>{user.uid}</span></Grid>
                        <Grid item xs={2}><span>{user.email}</span></Grid>
                        <Grid item xs={2}><span>{user.username}</span></Grid>
                        <Grid item xs={2}><span>{user.roles && user.roles.join(' ')}</span></Grid>
                        <Grid item xs={4}>
                          <span>
                            {(!user.roles || !user.roles.includes('trainer')) && (<CustomButton onClick={() => this.promoteToTrainer(user)}>Promote to trainer</CustomButton>)}
                            {(!user.roles || !user.roles.includes('admin')) && (<CustomButton onClick={() => this.promoteToAdmin(user)}>Promote to admin</CustomButton>)}
                            {(user.roles && user.roles.includes('trainer')) && (<CustomButton onClick={() => this.removeTrainer(user)}>Remove trainer</CustomButton>)}
                            {(user.roles && user.roles.includes('admin')) && (<CustomButton onClick={() => this.removeAdmin(user)}>Remove admin</CustomButton>)}
                          </span>
                        </Grid>
                      </Grid>
                    </li>
                  )})}
                </ul>
              </div>
            </div>
          </div>
        )
    }
}

export default compose(
    withFirebase,
    inject('userStore'),
    observer,
  )(UsersList);