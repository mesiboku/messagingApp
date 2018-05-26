import React, { Component } from 'react';
import { ListGroup, ListGroupItem, DropdownButton, MenuItem} from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class ContactList extends Component {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <Link to={"/msg/"+ this.props.user._id}>
                <ListGroupItem header={(this.props.contacts.email === this.props.user.emails[0].address) ? (this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName) : ''}>
                    {this.props.contacts.email}
                </ListGroupItem>
            </Link>
        );

    }

}

