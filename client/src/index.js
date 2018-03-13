import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import { firebaseApp } from './firebase';

import App from './components/App';
import SignUp from "./components/SignUp";

import './style/bootstrap.css';
import './style/App.css';

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user.email);
        
    } else {
        console.log('nu esti logat');
        
    }
});

  
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/signup" component={SignUp} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)