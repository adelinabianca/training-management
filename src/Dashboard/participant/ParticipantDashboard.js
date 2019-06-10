import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';



import styles from './ParticipantDashboard.module.scss';
import { inject, observer } from 'mobx-react';
import { getCourses } from '../../core/api/courses';
// import WhatDoYouWantToDo from '../admin/Main/WhatDoYouWantToDo';
// import Course from './Course/Course';
import { Hidden, Drawer } from '@material-ui/core';
import ParticipantCourse from './Course/ParticipantCourse';
// import WhatDoYouWantToDo from './admin/Main/WhatDoYouWantToDo';
// import EditArias from './admin/EditArias/EditArias';
// import UsersList from './admin/Users/UsersList';


@inject('sessionStore', 'drawerStore')
@observer
class ParticipantDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participantCourses: [],
            open: true
        }
    }

    async componentDidMount() {
        const { sessionStore: { authUser } } = this.props;
        if (authUser.participantCoursesIds) {
            await getCourses().then(response => {
                const participantCourses = Object.values(response.data).filter(course => authUser.participantCoursesIds.includes(course.courseId));
                this.setState({ participantCourses });
            })
        }
    }

    goOnCoursePage = (course) => {
        const { history } = this.props;
        history.push(`/participant-dashboard/${course.courseId}`);
        // this.handleDrawerToggle();
    }

    handleCollapseClick = () => {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    handleDrawerToggle = () => {
        const { drawerStore: {  participantDrawerOpen, setParticipantDrawerOpen} } = this.props;
        setParticipantDrawerOpen(!participantDrawerOpen);
    }

    drawerItems = () => {
        const { participantCourses, open } = this.state;

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
                <ListItem button onClick={this.handleCollapseClick}>
                    <ListItemIcon>
                    <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="My courses" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {participantCourses.map(course => (
                            <ListItem key={course.courseId} button onClick={() => this.goOnCoursePage(course)} className={styles.nested}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary={course.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        )
    }

    render() {
        const { drawerStore: { participantDrawerOpen } } = this.props;
        return (
            <div className={styles.dashboardWrapper}>
                <Hidden smDown>
                    <div className={styles.sidebar}>
                        {this.drawerItems()}
                    </div>
                </Hidden>
                <Hidden mdUp>
                    <Drawer
                      variant='temporary'
                      open={participantDrawerOpen}
                      onClose={this.handleDrawerToggle}>
                        {this.drawerItems()}
                    </Drawer>
                </Hidden>
               <div className={styles.content}>
                  <Switch>
                    <Route exact path="/participant-dashboard" />
                    <Route exact path="/participant-dashboard/:courseId" component={ParticipantCourse} />
                  </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(ParticipantDashboard);
