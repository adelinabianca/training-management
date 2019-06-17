import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './AdminDashboard.module.scss';
import EditArias from './EditArias/EditArias';
import UsersList from './Users/UsersList';
import { Hidden, Drawer } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import EditAccountDetailsForm from '../../Forms/EditAccountDetailsForm/EditAccountDetailsForm';

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
              className={styles.listRoot}>
                <ListItem button onClick={this.goOnMainPage}>
                    <ListItemText primary="Contul meu" />
                </ListItem>
                <ListItem button onClick={this.goOnMainPage}>
                    <ListItemText primary="Informatii utile" />
                </ListItem>
                <ListItem button onClick={this.handleEditArias}>
                    <ListItemText primary="Traininguri" />
                </ListItem>
                <ListItem button onClick={this.handleEditEvents}>
                    <ListItemText primary="Evenimente" />
                </ListItem>
                <ListItem button onClick={this.handleEditUsers}>
                    <ListItemText primary="Utilizatori" />
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
                        <Route exact path="/admin-dashboard" component={EditAccountDetailsForm} />
                        <Route exact path="/admin-dashboard/edit" component={EditArias} />
                        <Route exact path="/admin-dashboard/users" component={UsersList} />
                    </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard);