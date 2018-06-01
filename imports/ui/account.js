import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import { Button, Modal } from "react-bootstrap";
import ReactDOM from "react-dom";


class Accounts extends Component {


    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: '',
            username:this.props.user.username,
            email: this.props.user.emails[0].address,
            firstName: this.props.user.profile.firstName,
            lastName: this.props.user.profile.lastName
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            _id: Meteor.userId(),
            username: ReactDOM.findDOMNode(this.refs.username).value.trim(),
            email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
            firstName: ReactDOM.findDOMNode(this.refs.firstName).value.trim(),
            lastName: ReactDOM.findDOMNode(this.refs.lastName).value.trim()
        }

        if((!data.username) || (!data.email) || (!data.firstName) || (!data.lastName)) {
            this.setState({ error: 'All fields area required!' });
        } else {
            this.setState({ error: '' });
            Meteor.call('updateUserData.user',data);
            this.setState({ show: false });
        }
    }


    render() {
        if(this.props.user !== undefined) {
            return(
                <div className={"container"}>
                    <div className={"row"}>
                        <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                            <button type={"button"} className={"btn btn-default btn-sm btn-edit"} onClick={this.handleShow.bind(this)}><i className="fa fa-edit"></i></button>
                            <img src={"/img/default-profile.png"}  className={".img-responsive profile center-block"}/>
                            <h3  className={"text-center"}>{this.props.user.profile.firstName + " " + this.props.user.profile.lastName}</h3>
                            <h4  className={"text-center"}>{this.props.user.username}</h4>
                            <h4  className={"text-center"}>{this.props.user.emails[0].address}</h4>
                        </div>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            { this.state.error.length > 0 ?
                                <div className="alert alert-danger fade in">{this.state.error}</div>
                                :''}
                            <form>
                                <div className={"row"}>
                                    <div className={"col-lg-6 col-sm-6 col-md-6 col-xs-6"}>
                                        <div className="form-group">
                                            <label htmlFor="firstname">First Name:</label>
                                            <input type="text" className="form-control"  ref="firstName" required={true} value={this.state.firstName}
                                                   onChange={(e) => {this.setState({firstName: e.target.value})}}/>
                                        </div>
                                    </div>
                                    <div className={"col-lg-6 col-sm-6 col-md-6 col-xs-6"}>
                                        <div className="form-group">
                                            <label htmlFor="lastname">Last Name:</label>
                                            <input type="text" className="form-control"  ref="lastName" required={true} value={this.state.lastName}
                                                   onChange={(e) => {this.setState({lastName: e.target.value})}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                        <div className="form-group">
                                            <label htmlFor="username">Username:</label>
                                            <input type="text" className="form-control"  ref="username" required={true} value={this.state.username}
                                                   onChange={(e) => {this.setState({username: e.target.value})}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input type="email" className="form-control"  ref="email" required={true} value={this.state.email}
                                                   onChange={(e) => {this.setState({email: e.target.value})}}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
                            <Button onClick={this.handleClose.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    }

}


export default withTracker(() => {
    Meteor.subscribe('users');
    return {
        user: Meteor.users.findOne({_id:Meteor.userId()}),
    };
})(Accounts);