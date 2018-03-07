import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Glyphicon } from 'react-bootstrap';

import { firebaseApp } from '../firebase';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: '',
            error: {
                message: ''
            },
            emailError: true,
            prevErrorEmail: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
            this.setState({
                error: {
                    message: ''
                }
            });
            console.log(response);
            
        })
        .catch(error => {
            this.setState({
                error,
                prevErrorEmail: this.state.email
            });

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
            email,
            error: {
                message: ''
            }
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

        if (this.state.prevErrorEmail === this.state.email && len > 0) {
            this.state.error.message = 'The email address is already in use by another account.';
            return 'error'
        }

        if (len < 4 && len > 0) {
            return 'error'
        } else if (len >= 4 && this.validateCharUser() && this.state.error.message === '') {
            return 'success'
        } else if (len >= 4 && !this.validateCharUser()) {
            return 'warning'
        }

        if (this.state.error.message === 'The email address is already in use by another account.' || 
        this.state.error.message === 'The email address is badly formatted.') {
            return 'error'
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
            if (/^[a-zA-Z]+[a-zA-Z0-9]*[.][a-zA-Z]+[a-zA-Z0-9]*[@][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]+$/.test(this.state.email)) {
                return 1;
            } else if (/^[a-zA-Z]+[a-zA-Z0-9]*[@][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]+$/.test(this.state.email)) {
                return 1;
            } else if (/^[a-zA-Z]+[a-zA-Z0-9]*[@][a-zA-Z]+[a-zA-Z0-9]*[.][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]+$/.test(this.state.email)) {
                return 1;
            } else if (/^[a-zA-Z]+[a-zA-Z0-9]*[.][a-zA-Z]+[a-zA-Z0-9]*[@][a-zA-Z]+[a-zA-Z0-9]*[.][a-zA-Z]+[a-zA-Z0-9]*[.][a-z]+$/.test(this.state.email)) {
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
                            placeholder = "ex: andrei.popescu@info.uaic.ro"
                            maxLength = {40}
                            onChange = {e => this.changeValUser(e.target.value)}
                        />

                        <FormControl.Feedback>
                            <Glyphicon glyph={this.getStateUser()} className="verifPass" />
                        </FormControl.Feedback>

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

                        </FormGroup>

                        <div className="col-md-12 col-12 text-center container-btn">
                            <button
                                type="submit"
                                className="col-12 submitBtn"
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="errorMessaje">
                            {
                                (() => {
                                    if (this.state.error.message !== '') {
                                        return (
                                            <h1>{this.state.error.message}</h1>
                                        )
                                    } else {
                                        return (
                                            <h1>&nbsp;</h1>
                                        )
                                    }
                                })()
                            }
                        </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;