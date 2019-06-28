import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {  withStyles } from '@material-ui/core/styles';

import styles from './Reports.module.scss';
import AttendanceComplete from './AttendanceComplete/AttendanceComplete';
import Statistics from './Statistics/Statistics';

const CustomTabs = withStyles({
    root: {
      backgroundColor: 'transparent',
      boxShadow: 'none'
    },
    indicator: {
      backgroundColor: 'gray',
    },
    scrollButtons: {
        width: 0
    }
})(Tabs);

const CustomTab = withStyles({
    root: {
      color: 'gray'
    },
    selected: {
      color: 'gray',
    },
})(Tab);

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabValue: 0
        }
    }

    async componentDidMount() {
    }


    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    render() {
        const { course, tabValue } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.card}>
                    <div className={[styles.cardHeader, styles.cardHeaderPrimary].join(' ')}>
                        <h2>{course && course.name}</h2>
                        <AppBar position="static" color="default" className={styles.appBar}>
                            <CustomTabs
                                value={tabValue}
                                onChange={this.handleTabChange}
                                indicatorColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <CustomTab value={0} label="Statistici" />
                                <CustomTab value={1} label="Prezente" />
                            </CustomTabs>
                        </AppBar>
                    </div>
                    <div className={styles.cardBody}>
                        {tabValue === 0 && (
                            <Statistics />
                        )}
                        {tabValue === 1 && <AttendanceComplete />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Reports;