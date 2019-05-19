import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { observer, inject }  from 'mobx-react';
import styles from './NavigationBar.module.scss';
import { withFirebase } from '../Firebase';

@inject('userStore')
@observer
class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticatedUser: null
        }
    }

    render() {
        const { userStore: { authenticatedUser }, firebase  } = this.props;
        const user = firebase.getCurrentUser();
        // console.log(user)
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
                    {authenticatedUser ? (
                        <div>{authenticatedUser.user.email}</div>
                    ) :
                    (<Link to='/login'>Login</Link>)}
                </div>
            </div>
        )
    }
}

export default withFirebase(NavigationBar);