import React, { Component } from 'react';
import Presentation from './Presentation/Presentation';
import Arias from '../Arias/Arias';

class MainPage extends Component {
    render() {
        const { history } = this.props;
        return (
        <div>
            <Presentation history={history} />
            <Arias history={history} />
        </div>
        )
    }
};

export default MainPage;