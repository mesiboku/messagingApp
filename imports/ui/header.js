import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props){
        super(props);
    }

    logout(e){
        e.preventDefault();
        Meteor.logout( (err) => {
            if (err) {
                console.log( err.reason );
            } else {
                this.props.history.push('/');
            }
        });
    }

    render() {
        return(

            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Messenger</Link>
                        { this.props.currentUser ?
                        <button className="btn btn-default navbar-btn pull-right custom" onClick={this.logout.bind(this)}>
                            Logout
                        </button> :'' }
                    </div>
                </div>
            </nav>
        );
    }
};

export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
        currentUser: Meteor.user(),
    };
})(Header);