import React, { Component } from 'react';
import Presentation from './Presentation/Presentation';
import Arias from '../Arias/Arias';
import Conference from './Events/Conference';
import Hackaton from './Events/Hackaton';
import Footer from '../core/components/Footer/Footer';

class MainPage extends Component {
    render() {
        const { history } = this.props;
        return (
        <>
            <div>
                <Presentation history={history} />
                <Arias history={history} />
                <Conference />
                <Hackaton />
            </div>
            <Footer />
        </>
        )
    }
};

export default MainPage;