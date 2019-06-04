import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { AccountCircleOutlined } from '@material-ui/icons';

import styles from './AdminDashboard.module.scss';
import EditArias from './EditArias/EditArias';
import UsersList from './Users/UsersList';
import WhatDoYouWantToDo from './Main/WhatDoYouWantToDo';

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0
        }
    }

    handleEditArias = () => {
        const { history } = this.props;
        history.push('/admin-dashboard/edit');
        this.setState({ selectedItem: 1 });
    }

    handleEditUsers = () => {
        const { history } = this.props;
        
        this.setState({ selectedItem: 3 });
        history.push('/admin-dashboard/users');
    }

    goOnMainPage = () => {
        const { history } = this.props;
        this.setState({ selectedItem: 0 })
        history.push('/admin-dashboard')
    }

    handleEditEvents = () => {
        this.setState({ selectedItem: 2})
    }

    render() {
        return (
            <div className={styles.dashboardWrapper}>
               <div className={styles.sidebar}>
                <List
                    component="nav"
                    // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                    className={styles.root}
                    >
                        <ListItem button onClick={this.goOnMainPage}>
                            <ListItemIcon>
                            <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={this.handleEditArias}>
                            <ListItemIcon>
                            <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Arias" />
                        </ListItem>
                        <ListItem button onClick={this.handleEditEvents}>
                            <ListItemIcon>
                            <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Events" />
                        </ListItem>
                        <ListItem button onClick={this.handleEditUsers}>
                            <ListItemIcon>
                            <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                    </List>
               </div>
               <div className={styles.content}>
                    <Switch>
                        <Route exact path="/admin-dashboard" component={WhatDoYouWantToDo} />
                        <Route exact path="/admin-dashboard/edit" component={EditArias} />
                        <Route exact path="/admin-dashboard/users" component={UsersList} />
                    </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard);