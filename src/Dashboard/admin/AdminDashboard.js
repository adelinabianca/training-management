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
import { Hidden, Drawer } from '@material-ui/core';
import { observer, inject } from 'mobx-react';

@inject('drawerStore')
@observer
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0,
        }
    }

    handleEditArias = () => {
        const { history } = this.props;
        history.push('/admin-dashboard/edit');
        this.setState({ selectedItem: 1 });
        this.handleDrawerToggle();
    }

    handleEditUsers = () => {
        const { history } = this.props;
        
        this.setState({ selectedItem: 3 });
        history.push('/admin-dashboard/users');
        this.handleDrawerToggle();
    }

    goOnMainPage = () => {
        const { history } = this.props;
        this.setState({ selectedItem: 0 })
        history.push('/admin-dashboard');
        this.handleDrawerToggle();
    }

    handleEditEvents = () => {
        this.setState({ selectedItem: 2})
        this.handleDrawerToggle();
    }

    handleDrawerToggle = () => {
        const { drawerStore: {  adminDrawerOpen, setAdminDrawerOpen} } = this.props;
        setAdminDrawerOpen(!adminDrawerOpen);
    }

    drawerItems = () => {
        return (
            <List
              component="nav"
              // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
              className={styles.listRoot}>
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
       )
    }

    render() {
        const { drawerStore: { adminDrawerOpen } } = this.props;
        return (
            <div className={styles.dashboardWrapper}>
               <Hidden smDown>
                    <div className={styles.sidebar}>
                        {this.drawerItems()}
                    </div>
               </Hidden>
               <Hidden mdUp>
                   <Drawer
                    variant="temporary"
                    open={adminDrawerOpen}
                    onClose={this.handleDrawerToggle}>
                        {this.drawerItems()}
                    </Drawer>
               </Hidden>
               <div className={styles.content}>
                    <Switch>
                        <Route exact path="/admin-dashboard" />
                        <Route exact path="/admin-dashboard/edit" component={EditArias} />
                        <Route exact path="/admin-dashboard/users" component={UsersList} />
                    </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard);