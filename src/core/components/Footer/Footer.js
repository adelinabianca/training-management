import React, { Component } from 'react';

import styles from './Footer.module.scss';


class Footer extends Component {
    render () {
        return (
            <footer className={styles.wrapper}>
                <div className={styles.content}>
                    this is the footer
                </div>
            </footer>
        )
    }
}

export default Footer;