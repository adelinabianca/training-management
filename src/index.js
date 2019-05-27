import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import userStore from './core/stores/userStore';
import sessionStore from './core/stores/sessionStore';
import messagesStore from './core/stores/messagesStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './Firebase';

const stores = {
    userStore,
    sessionStore,
    messagesStore
}

ReactDOM.render(
    <Provider {...stores}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
