import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import { Link } from "react-router-dom";



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            username: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let username = document.getElementById('email').value;
        let password = document.getElementById('pwd').value;
        Meteor.loginWithPassword(username, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
                this.setState({
                    error: ''
                });
            }
        });
    }

    render() {

        return(
            <div>
                <form id="login-form" onSubmit={this.handleSubmit}>
                    { this.state.error.length > 0 ?
                        <div className="alert alert-danger fade in">{this.state.error}</div>
                        :''}
                    <div className="form-group">
                        <label htmlFor="email">Email or Username:</label>
                        <input type="text" className="form-control" id="email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd"/>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button> <Link to={"/register"}>Register</Link>
                </form>
            </div>
        );
    }

}

export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
    };
})(Login);