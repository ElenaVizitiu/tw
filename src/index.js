import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import { firebaseApp } from './firebase';

import App from './components/App';
import SignUp from "./components/SignUp";

import './style/bootstrap.css';
import './style/App.css';
// var curentUser = firebaseApp.auth().currentUser;

// curentUser.sendEmailVerification().then(function() {
//     console.log("mail trimis");
// }).catch(function(error) {
//     console.log(error);
// });

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        
    } else {
        
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