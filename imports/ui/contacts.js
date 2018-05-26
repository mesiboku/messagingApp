import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ListGroup, Button, Modal } from "react-bootstrap";
import { Contacts as contactsData } from '../api/contacts';
import ReactDOM from 'react-dom';
import ContactList from './contactList';


class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            error: ''
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
        let checkIfExist = Meteor.users.find({'emails.0.address': ReactDOM.findDOMNode(this.refs.email).value.trim()}).fetch();
        if(checkIfExist.length > 0) {
            let data = {
                email: ReactDOM.findDOMNode(this.refs.email).value.trim(),
                contactOwner: Meteor.userId()
            }
            let findContact = contactsData.find({email: data.email,contactOwner: Meteor.userId()}).fetch();
            if(findContact.length > 0) {
                this.setState({
                    error: "Email already in contact list"
                });
            } else {
                Meteor.call('contacts.insert',data, (err) => {
                    if(err){
                        this.setState({
                            error: err.reason
                        });
                    }
                });
                ReactDOM.findDOMNode(this.refs.email).value = '';
                this.setState({ show: false });
            }
        } else {
            this.setState({
                error: "Email not registered"
            });
        }
    }

    renderContacts() {
        let contactsList = this.props.contacts;
        let userData = this.props.usersData;
        return contactsList.map((contacts) => {
            return userData.map((user) =>{
                if(user.emails[0].address === contacts.email){
                    return (
                        <ContactList
                            key={contacts._id}
                            contacts={contacts}
                            user={user}
                        />
                    );
                }
            });
        });
    }

    render() {

        return(
            <div>
                <Button bsStyle="primary" bsSize="large" block onClick={this.handleShow.bind(this)}>
                    Add Contacts
                </Button>
                <div className={"tab-pane"}>
                    <ListGroup>
                        {this.renderContacts()}
                    </ListGroup>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Contacts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.state.error.length > 0 ?
                            <div className="alert alert-danger fade in">{this.state.error}</div>
                            :''}
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control"  ref="email" required={true}/>
                            </div>

                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}


export default withTracker(() => {
   /* let contactSub = Meteor.subscribe('contacts');
    let userSub = Meteor.subscribe('users');
    let contact = [];
    let user = [];
    if(contactSub.ready() &&  userSub.ready()) {
        contact = contactsData.find({contactOwner: Meteor.userId()}).fetch()
        user = Meteor.users.find({}).fetch()
        return {
            contacts: contact,
            usersData: user,
        };
    }*/
    Meteor.subscribe('contacts');
    Meteor.subscribe('users');
    return {
        contacts: contactsData.find({contactOwner: Meteor.userId()}).fetch(),
        usersData: Meteor.users.find({}).fetch(),
    };
})(Contacts);