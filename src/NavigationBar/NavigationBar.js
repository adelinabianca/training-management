import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import { observer, inject }  from 'mobx-react';
import { Button, MenuList, MenuItem, Avatar, Hidden } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowIcon from '@material-ui/icons/ArrowDropDown';
import styles from './NavigationBar.module.scss';
import { withAuthentication } from '../Firebase/Session';
import fiilogo from '../assets/images/fplogo.png';

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
        history.push('/user-account');
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
                        <span><Link to='/conference'>Conferinta</Link></span>
                        <span><Link to='/hackathon'>Hackathon</Link></span>
                        <span><Link to='/about'>Despre</Link></span>
                    </Hidden>
                    <div className={styles.account}>
                        {authUser ? (
                            <div>
                                <Button
                                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.openMenu}
                                >
                                    {/* <Avatar className={styles.avatar}>{initials}</Avatar> */}
                                    <span className={styles.userName}>{authUser.username}</span>
                                    <ArrowIcon />
                                </Button>
                                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition style={{ zIndex: '9999' }}>
                                    {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="simple-menu"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                        <ClickAwayListener onClickAway={this.handleCloseMenu}>
                                            <MenuList>
                                                {authUser && authUser.roles && 
                                                    authUser.roles.includes('admin') && (<MenuItem onClick={this.goToAdminDashboard}>Admin dashboard</MenuItem>)}
                                                {authUser && authUser.roles && 
                                                    authUser.roles.includes('trainer') && (<MenuItem onClick={this.goToTrainerDashboard}>Trainer dashboard</MenuItem>)}
                                                <MenuItem onClick={this.goOnUserPanel}>Contul meu</MenuItem>
                                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                    )}
                                </Popper>
                            </div>
                        ) :
                        (<span><Link to='/login'><Button className={styles.authBtn}>Autentificare</Button></Link></span>)}
                    </div>
                    
                </nav>
            </div>
        )
    }
}

export default withRouter(withAuthentication(NavigationBar));