import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { observer, inject }  from 'mobx-react';
import styles from './NavigationBar.module.scss';
import { withAuthentication } from '../Firebase/Session';
import { Button, Menu, MenuItem } from '@material-ui/core';

@inject('sessionStore')
@observer
class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    openMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    }

    goToAdminDashboard = () => {
        const { history } = this.props;
        this.handleCloseMenu();
        history.push('/admin-dashboard');
    }

    goToTrainerDashboard = () => {
        const { history } = this.props;
        this.handleCloseMenu();
        history.push('/trainer-dashboard')
    }

    handleLogout = () => {
        const { firebase, history } = this.props;
        firebase.logout().then(response => {});
        this.handleCloseMenu();
        history.push('/main');
    }

    render() {
        const { sessionStore: { authUser }, firebase  } = this.props;
        const { anchorEl } = this.state;
        // const user = firebase.getCurrentUser();
        // console.log(authUser)
        return (
            <div className={styles.header}>
                <div className={styles.logo}><Link to='/'>LOGO</Link></div>
                {/* <div className={styles.menu}>
                    <span className={styles.menuItem}><Link to='/arii'>Arii</Link></span>
                    <span>Program</span>
                    <span>Evenimente</span>
                    <span>Cum aplic</span>
                    <span>Despre</span>
                </div> */}
                <div className={styles.logo}>
                    {authUser ? (
                        <div>
                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.openMenu}
                            >
                                {authUser.username}
                            </Button>
                            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleCloseMenu}>
                                {authUser && authUser.roles && 
                                    authUser.roles.includes('admin') && (<MenuItem onClick={this.goToAdminDashboard}>Admin account</MenuItem>)}
                                {authUser && authUser.roles && 
                                    authUser.roles.includes('trainer') && (<MenuItem onClick={this.goToTrainerDashboard}>Trainer account</MenuItem>)}
                                <MenuItem onClick={this.goToMyAccount}>My account</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) :
                    (<Link to='/login'>Login</Link>)}
                </div>
            </div>
        )
    }
}

export default withRouter(withAuthentication(NavigationBar));