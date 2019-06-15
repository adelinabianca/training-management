import React, { Component } from 'react';
import Presentation from './Presentation/Presentation';
import Arias from '../Arias/Arias';
import Conference from './Events/Conference';
import Hackaton from './Events/Hackaton';

class MainPage extends Component {
    render() {
        const { history } = this.props;
        return (
        <div>
            <Presentation history={history} />
            <Arias history={history} />
            <Conference />
            <Hackaton />
        </div>
        )
    }
};

export default MainPage;