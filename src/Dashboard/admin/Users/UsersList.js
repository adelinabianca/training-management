import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/GroupTwoTone'

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
          return <div className={styles.loading}>Loading... </div>
        }

        return (
          <div className={styles.mainWrapper}>
            <div className={styles.card}>
              <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                <div className={styles.usersTitle}><GroupIcon /> {users.length} users</div>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li className={styles.listHeader}>
                    <Grid container>
                      <Grid item xs={3}><span><strong>Nume</strong></span></Grid>
                      <Grid item xs={3}><span><strong>E-mail</strong></span></Grid>
                      <Grid item xs={2}><span><strong>Roluri</strong></span></Grid>
                      <Grid item xs={4}><span><strong>Actiuni</strong></span></Grid>
                    </Grid>
                  </li>
                  {users && users.map(user => {
                    return (
                    <li key={user.uid} className={styles.listItem}>
                      <Grid container>
                        <Grid item xs={3}><span>{user.username}</span></Grid>
                        <Grid item xs={3}><span>{user.email}</span></Grid>
                        <Grid item xs={2}><span className={styles.roles}>{user.roles && user.roles.join(' | ')}</span></Grid>
                        <Grid item xs={4}>
                          <span>
                            {(!user.roles || !user.roles.includes('trainer')) && (<CustomButton onClick={() => this.promoteToTrainer(user)}>Promoveaza la trainer</CustomButton>)}
                            {(!user.roles || !user.roles.includes('admin')) && (<CustomButton onClick={() => this.promoteToAdmin(user)}>Promoveaza la admin</CustomButton>)}
                            {(user.roles && user.roles.includes('trainer')) && (<CustomButton onClick={() => this.removeTrainer(user)}>Sterge trainer</CustomButton>)}
                            {(user.roles && user.roles.includes('admin')) && (<CustomButton onClick={() => this.removeAdmin(user)}>Sterge admin</CustomButton>)}
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