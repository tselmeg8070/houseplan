import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Firebase, {FirebaseContext} from "./Firebase";
import Server, {ServerContext} from './Server';
import {Provider} from 'react-redux';
import store from './redux/store'

ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <ServerContext.Provider value={new Server()}>
                <App />
            </ServerContext.Provider>
        </FirebaseContext.Provider>
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
