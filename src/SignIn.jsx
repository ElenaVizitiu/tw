import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';
import firebase from 'firebase';
import './bootstrap.css';
import './App.css';

var config = {
    apiKey: "AIzaSyDu6XJ2hiIHC8dQLv9PyPxuII-KBh6PT40",
    authDomain: "tw-team.firebaseapp.com",
    databaseURL: "https://tw-team.firebaseio.com",
    projectId: "tw-team",
    storageBucket: "tw-team.appspot.com",
    messagingSenderId: "384211732667"
};

firebase.initializeApp(config);

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: ''
        }
    }

    

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode) {
                console.log(errorCode);
            }

            if (errorMessage) {
                console.log(errorMessage);
            }
        })

        var curentUser = firebase.auth().currentUser;

        curentUser.sendEmailVerification().then(function() {
            console.log("mail trimis");
        }).catch(function(error) {
            
        });
        
    }

    changeValPass(password) {
        this.setState({
            password
        });
    }

    changeValRePass(rePassword) {
        this.setState({
            rePassword
        });
    }

    changeValUser(email) {
        this.setState({
            email
        });
    }
    
    getValidationState() {
        let len = this.state.password.length;

        if (len < 6 && len > 0) {
            return 'error'
        } else if (len >= 6 && this.validateChar()) {
            return 'success'
        } else if (len >= 6 && !this.validateChar()) {
            return 'warning'
        }
        
        return null
    }

    getStateVerifiyPassword() {
        if (this.state.rePassword.length > 0) {
            if (this.state.password === this.state.rePassword) {
                return 'ok-sign'
            } else {
                return 'remove-sign'
            }
        }
        return 'nothing'
    }

    getValidationStateUser() {
        let len = this.state.email.length;

        if (len < 4 && len > 0) {
            return 'error'
        } else if (len >= 4 && this.validateCharUser()) {
            return 'success'
        } else if (len >= 4 && !this.validateCharUser()) {
            return 'warning'
        }
        
        return null
    }

    getValidationReState() {
        if (this.state.rePassword.length > 0) {
            if (this.state.password === this.state.rePassword) {
                return 'success'
            } else {
                return 'error'
            }
        }
    }

    getState() {
        if (this.getValidationState() === "error") {
            return 'remove-sign'
        } else if (this.getValidationState() === "success" && this.validateChar()) {
            return 'ok-sign'
        } else if (this.getValidationState() === "warning" && !this.validateChar()) {
            return 'minus-sign'
        }

        return 'nothing'
    }

    getStateUser() {
        if (this.getValidationStateUser() === "error") {
            return 'remove-sign'
        } else if (this.getValidationStateUser() === "success" && this.validateCharUser()) {
            return 'ok-sign'
        } else if (this.getValidationStateUser() === "warning" && !this.validateCharUser()) {
            return 'minus-sign'
        }

        return 'nothing'
    }

    validateChar() {
        if (this.state.password.length >= 6) {
            return /^[0-9a-zA-Z]+[.?!@[\]{}]*[0-9a-zA-Z]*$/.test(this.state.password);
        }
        return 1;
    }

    validateCharUser() {
        if (this.state.email.length >= 4) {
            if (/^[a-zA-Z]+[a-zA-Z0-9]*[.][@][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]*$/.test(this.state.email)) {
                return 1;
            } else if (/^[a-zA-Z]+[a-zA-Z0-9]*[.][a-zA-Z0-9]+[@][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]*$/.test(this.state.email)) {
                return 1;
            } else {
                return 0;
            }
        }
        return 1;
    }

    render() {
        return(
            <div className="align-middle">
                <div className="container">
                    <div className="col-md-6 offset-md-3 color">
                        <h2>Sign Up</h2>

                        <form
                            onSubmit = {e => this.handleSubmit(e)}
                        >

                        <FormGroup
                            validationState={this.getValidationStateUser()}
                        >

                        <ControlLabel>
                            Email
                        </ControlLabel>

                        <FormControl 
                            className="input"
                            type = "text"
                            placeholder = "ex: andrei.popescu"
                            maxLength = {20}
                            onChange = {e => this.changeValUser(e.target.value)}
                        />

                        <FormControl.Feedback>
                            <Glyphicon glyph={this.getStateUser()} className="verifPass" />
                        </FormControl.Feedback>

                        {(() => {
                            let st = this.getStateUser();

                            if (st === "remove-sign") {
                                return (
                                    <p style={{color: '#a94442', marginTop: '5px', marginBottom: '-10px'}}>Username-ul trebuie sa contina cel putin 4 caractere.</p>
                                )
                            } else if (!this.validateCharUser()) {
                                return (
                                    <p style={{color: '#8a6d3b', marginTop: '5px', marginBottom: '-10px'}}>Username-ul terbuie sa contina doar liere mici, mari sau cifre.</p>
                                )
                            } else {
                                return (
                                    <p style={{marginTop: '5px', marginBottom: '-10px'}}>&nbsp;</p>
                                )
                            }
                            
                        })()}

                        </FormGroup>

                        <FormGroup
                            validationState={this.getValidationState()}
                        >

                        <ControlLabel>
                            Password
                        </ControlLabel>

                        <FormControl 
                            className="input"
                            type = "password"
                            placeholder = "Your password"
                            maxLength = {15}
                            onChange = {e => this.changeValPass(e.target.value)}
                        />

                        <FormControl.Feedback>
                            <Glyphicon glyph={this.getState()} className="verifPass" />
                        </FormControl.Feedback>

                        {(() => {
                            let st = this.getState();

                            if (st === "remove-sign") {
                                return (
                                    <p style={{color: '#a94442', marginTop: '5px', marginBottom: '-5px'}}>Parola trebuie sa contina cel putin 6 caractere.</p>
                                )
                            } else if (!this.validateChar()) {
                                return (
                                    <p style={{color: '#8a6d3b', marginTop: '5px', marginBottom: '-5px'}}>Parola terbuie sa contina doar liere mici, mari sau cifre.</p>
                                )
                            } else {
                                return (
                                    <p style={{marginTop: '5px', marginBottom: '-5px'}}>&nbsp;</p>
                                )
                            }
                            
                        })()}

                        </FormGroup>

                        <FormGroup
                            validationState={this.getValidationReState()}
                        >

                        <ControlLabel>
                            Verify password
                        </ControlLabel>

                        <FormControl 
                            className="input"
                            type = "password"
                            placeholder = "Verify password"
                            maxLength = {15}
                            onChange = {e => this.changeValRePass(e.target.value)}
                        />

                        <FormControl.Feedback>
                            <Glyphicon glyph={this.getStateVerifiyPassword()} className="verifPass" />
                        </FormControl.Feedback>

                        {(() => {
                            let st = this.getStateVerifiyPassword();

                            if (st === "remove-sign") {
                                return (
                                    <p style={{color: '#a94442', marginTop: '5px', marginBottom: '-5px'}}>Parolele nu coincid.</p>
                                )
                            } else {
                                return (
                                    <p style={{marginTop: '5px', marginBottom: '-5px'}}>&nbsp;</p>
                                )
                            }
                            
                        })()}

                        </FormGroup>

                        <div className="col-md-12 col-12 text-center container-btn">
                            <button
                                type="submit"
                                className="col-12 submitBtn"
                            >
                                Sign Up
                            </button>
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;