import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './NavigationBar.module.scss';

class NavigationBar extends Component {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.logo}><Link to='/'>LOGO</Link></div>
                <div className={styles.menu}>
                    <span className={styles.menuItem}><Link to='/arii'>Arii</Link></span>
                    <span>Program</span>
                    <span>Evenimente</span>
                    <span>Cum aplic</span>
                    <span>Despre</span>
                </div>
                <div className={styles.userAccount}>USERNAME</div>
            </div>
        )
    }
}

export default NavigationBar;