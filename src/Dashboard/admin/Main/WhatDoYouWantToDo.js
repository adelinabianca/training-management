import React, { Component } from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { AccountCircleOutlined } from '@material-ui/icons';
import { Link } from "react-router-dom";
import OptionButton from '../../../core/components/OptionButton/OptionButton';

import styles from './WhatDoYouWantToDo.module.scss';

class WhatDoYouWantToDo extends Component {
    render() {
        const { history } = this.props;
        return (
            <Card className={styles.card}>
                    <CardHeader title="What do you want to do?" className={styles.headerTitle} />
                     <CardContent>
                        <OptionButton 
                           title="Arias"
                           subtitle="Create, edit and delete arias"
                        //    isSelected
                           icon={<AccountCircleOutlined size="large" variant="outlined" />}
                           onSelect={() => {history.push('/dashboard/edit')}}
                        />
                        <OptionButton 
                           title="Courses"
                           subtitle="Add courses, trainers and details"
                        //    isSelected={false}
                           icon={<AccountCircleOutlined size="large" variant="outlined" />}
                           onSelect={() => {}}
                        />
                        <OptionButton 
                           title="Roles"
                           subtitle="Promote users to allow access to different features"
                           isSelected={false}
                           icon={<AccountCircleOutlined size="large" variant="outlined" />}
                           onSelect={() => {}}
                        />
                        <OptionButton 
                           title="Events"
                           subtitle="Add new events and details about them"
                           isSelected={false}
                           icon={<AccountCircleOutlined size="large" variant="outlined" />}
                           onSelect={() => {}}
                        />
                     </CardContent>
                 </Card>
        )
    }
}

export default WhatDoYouWantToDo;