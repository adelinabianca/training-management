import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { AccountCircleOutlined } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// import EditArias from './EditArias/EditArias';
// import UsersList from './Users/UsersList';
// import WhatDoYouWantToDo from './Main/WhatDoYouWantToDo';



import styles from './TrainerDashboard.module.scss';
// import WhatDoYouWantToDo from './admin/Main/WhatDoYouWantToDo';
// import EditArias from './admin/EditArias/EditArias';
// import UsersList from './admin/Users/UsersList';

class TrainerDashboard extends Component {
    render() {
        const open = true;
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
                    <ListItem button onClick={this.handleEditArias}>
                        <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon>
                        <ListItemText primary="My courses" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={styles.nested}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary="Course 1" />
                            </ListItem>
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
                  trainer Dashboard content
                  {/* <Switch>
                        <Route exact path="/trainer-dashboard" component={WhatDoYouWantToDo} />
                        <Route exact path="/trainer-dashboard/edit" component={EditArias} />
                        <Route exact path="/trainer-dashboard/users" component={UsersList} />
                    </Switch> */}
               </div>
            </div>
        )
    }
}

export default TrainerDashboard;



{/* <div className={styles.dashboardWrapper}>
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
         <ListItem button onClick={this.handleEditArias}>
             <ListItemIcon>
             <SendIcon />
             </ListItemIcon>
             <ListItemText primary="Arias" />
         </ListItem>
         <ListItem button>
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
         </ListItem>
     </List>
</div>
<div className={styles.content}>
     <Switch>
         <Route exact path="/admin-dashboard" component={WhatDoYouWantToDo} />
         <Route exact path="/admin-dashboard/edit" component={EditArias} />
         <Route exact path="/admin-dashboard/users" component={UsersList} />
     </Switch>
</div>
</div> */}
