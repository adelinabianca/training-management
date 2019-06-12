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
            <div>
               Welcome 
            </div>
        )
    }
}

export default WhatDoYouWantToDo;