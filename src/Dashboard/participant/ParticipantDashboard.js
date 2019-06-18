import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './ParticipantDashboard.module.scss';
import { inject, observer } from 'mobx-react';
import { getCourses } from '../../core/api/courses';
import { Hidden, Drawer } from '@material-ui/core';
import ParticipantCourse from './Course/ParticipantCourse';
import EditAccountDetailsForm from '../../Forms/EditAccountDetailsForm/EditAccountDetailsForm';


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
            const confirmedCourses = authUser.participantCoursesIds.filter(course => course.confirmed).map(course => course.courseId)
            await getCourses().then(response => {
                const participantCourses = Object.values(response.data).filter(course => confirmedCourses.includes(course.courseId));
                this.setState({ participantCourses });
            })
        }
    }

    goOnMainPage = () => {
        const { history } = this.props;
        history.push(`/user-account`);
        this.handleDrawerToggle();
    }

    goOnCoursePage = (course) => {
        const { history } = this.props;
        history.push(`/user-account/course/${course.courseId}`);
        this.handleDrawerToggle();
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
              className={styles.listRoot}>
                <ListItem button onClick={this.goOnMainPage}>
                    <ListItemText primary="Contul meu" />
                </ListItem>
                <ListItem button onClick={this.handleCollapseClick}>
                    <ListItemText primary="Cursuri" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {participantCourses.map(course => (
                            <ListItem key={course.courseId} button onClick={() => this.goOnCoursePage(course)} className={styles.nested}>
                                <ListItemText primary={course.name} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
                <ListItem button onClick={this.goOnMainPage}>
                    <ListItemText primary="Feedback" />
                </ListItem>
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
                    <Route exact path="/user-account" component={EditAccountDetailsForm} />
                    <Route exact path="/user-account/details" component={EditAccountDetailsForm} />
                    <Route exact path="/user-account/course/:courseId" component={ParticipantCourse} />
                  </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(ParticipantDashboard);
