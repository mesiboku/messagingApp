import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = {
        username: ReactDOM.findDOMNode(this.refs.username).value.trim(),
        password: ReactDOM.findDOMNode(this.refs.password).value.trim(),
        email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
        profile: {
            firstName: ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
            lastName: ReactDOM.findDOMNode(this.refs.lastName).value.trim()
        }
        }
        Accounts.createUser(data, (err) => {
            if(err){
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
            }
        });
        //Meteor.call('user.insert',data);
        ReactDOM.findDOMNode(this.refs.firstName).value = '';
        ReactDOM.findDOMNode(this.refs.lastName).value = '';
        ReactDOM.findDOMNode(this.refs.password).value = '';
        ReactDOM.findDOMNode(this.refs.email).value = '';
    }

    render() {
        const error = this.state.error;
        return(

            <div>
                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    { this.state.error.length > 0 ?
                        <div className="alert alert-danger fade in">{error}</div>
                        :''}
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control"  ref="email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="username" className="form-control"  ref="username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="test">First Name:</label>
                            <input type="text" className="form-control" ref="firstName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="test">Last Name:</label>
                            <input type="text" className="form-control" ref="lastName"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" ref="password"/>
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button> Already have an Account? Click <Link to={"/"}>Here</Link>
                    </form>

                </div>
            </div>
        );
    }

}


export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
    };
})(Register);