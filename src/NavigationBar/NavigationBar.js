import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { observer, inject }  from 'mobx-react';
import { Button, Menu, MenuItem, Avatar, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './NavigationBar.module.scss';
import { withAuthentication } from '../Firebase/Session';
import fiilogo from '../assets/images/logo-fii.png';

@inject('sessionStore', 'drawerStore')
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

    goOnUserPanel = () => {
        const { history } = this.props;
        this.handleCloseMenu();
        history.push('/participant-dashboard');
    }

    handleDrawerToggle = () => {
        const { drawerStore: { setAllDrawers } } = this.props;
        setAllDrawers(true)
    }

    render() {
        const { sessionStore: { authUser }, firebase  } = this.props;
        const { anchorEl } = this.state;
        // const user = firebase.getCurrentUser();
        // console.log(authUser)
        let initials = authUser ? authUser.username.match(/\b\w/g) : [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return (
            <div className={styles.headerWrapper}>
                <div className={styles.logo}>
                    <Hidden mdUp><MenuIcon onClick={this.handleDrawerToggle} /></Hidden>
                    <Link to='/'>
                        <img src={fiilogo} alt='fii' className={styles.logoImage} />
                    </Link>
                </div>
                <nav className={styles.menu}>
                    <Hidden smDown>
                        <span className={styles.menuItem}><Link to='/main'>Arii</Link></span>
                        <span><Link to='/main'>Program</Link></span>
                        <span><Link to='/main'>Evenimente</Link></span>
                        <span><Link to='/main'>Cum aplic</Link></span>
                        <span><Link to='/main'>Despre</Link></span>
                    </Hidden>
                    <div className={styles.account}>
                        {authUser ? (
                            <div>
                                <Button
                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.openMenu}
                                >
                                    <Avatar className={styles.avatar}>{initials}</Avatar>
                                </Button>
                                <Menu 
                                    id="simple-menu" 
                                    anchorEl={anchorEl} 
                                    open={Boolean(anchorEl)} 
                                    onClose={this.handleCloseMenu}
                                    elevation={0}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}>
                                    {authUser && authUser.roles && 
                                        authUser.roles.includes('admin') && (<MenuItem onClick={this.goToAdminDashboard}>Admin dashboard</MenuItem>)}
                                    {authUser && authUser.roles && 
                                        authUser.roles.includes('trainer') && (<MenuItem onClick={this.goToTrainerDashboard}>Trainer dashboard</MenuItem>)}
                                    <MenuItem onClick={this.goOnUserPanel}>Cursuri</MenuItem>
                                    <MenuItem onClick={this.goToMyAccount}>Contul meu</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        ) :
                        (<span><Link to='/login'>Autentificare</Link></span>)}
                    </div>
                    
                </nav>
            </div>
        )
    }
}

export default withRouter(withAuthentication(NavigationBar));