import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// import EditArias from './EditArias/EditArias';
// import UsersList from './Users/UsersList';
// import WhatDoYouWantToDo from './Main/WhatDoYouWantToDo';



import styles from './TrainerDashboard.module.scss';
import { inject, observer } from 'mobx-react';
import { getCourses } from '../../core/api/courses';
import WhatDoYouWantToDo from '../admin/Main/WhatDoYouWantToDo';
import Course from './Course/Course';
// import WhatDoYouWantToDo from './admin/Main/WhatDoYouWantToDo';
// import EditArias from './admin/EditArias/EditArias';
// import UsersList from './admin/Users/UsersList';
@inject('sessionStore')
@observer
class TrainerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asignedCourses: [],
            open: false
        }
    }

    async componentDidMount() {
        const { sessionStore: { authUser } } = this.props;
        if (authUser.asignedCoursesIds) {
            await getCourses().then(response => {
                const asignedCourses = Object.values(response.data).filter(course => authUser.asignedCoursesIds.includes(course.courseId));
                this.setState({ asignedCourses });
            })
        }
    }

    goOnCoursePage = (course) => {
        const { history } = this.props;
        history.push(`/trainer-dashboard/${course.courseId}`)
    }

    handleCollapseClick = () => {
        const { open } = this.state;
        this.setState({ open: !open });
    }

    render() {
        const { asignedCourses, open } = this.state;
        return (
            <div className={styles.dashboardWrapper}>
               <div className={styles.sidebar}>
                <List
                    component="nav"
                    // subheader={<ListSubheader component="div">Nested List Items</ListSubheader>}
                    className={styles.root}
                    >
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
                            {asignedCourses.map(course => (
                                <ListItem key={course.courseId} button onClick={() => this.goOnCoursePage(course)} className={styles.nested}>
                                    <ListItemIcon>
                                        <SendIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={course.name} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                    {/* <ListItem button>
                        <ListItemIcon>
                        <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItem>
                    <ListItem button onClick={this.handleEditUsers}>
                        <ListItemIcon>
                        <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem> */}
                </List>
               </div>
               <div className={styles.content}>
                  <Switch>
                        <Route exact path="/trainer-dashboard" component={WhatDoYouWantToDo} />
                        <Route exact path="/trainer-dashboard/:courseId" component={Course} />
                    </Switch>
               </div>
            </div>
        )
    }
}

export default withRouter(TrainerDashboard);
