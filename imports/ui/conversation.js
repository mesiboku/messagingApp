import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Tabs, Tab, ListGroup, ListGroupItem ,Badge, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Messages as messagesData } from '../api/messages';

//UI
import Contacts from "./contacts";
import Accounts from "./account";

//API
import {Conversations as convo} from "../api/conversations";



class Conversations extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1
        };
    }

    handleSelect(key) {
        this.setState({ key });
    }

    renderMessages() {
        const msg = this.props.chat;
        const msgList = this.props.msg;
        if(msg != undefined) {
            return msg.map((data) => {
                let x = 0;
                return data.conversations.map((a) => {
                    return this.props.usersData.map((user) => {
                        let data1 = messagesData.find({conversationsId: data._id}).fetch();
                        let msgListSize = data1.length;
                        if(a === user._id && a !== Meteor.userId()){
                            let count = 0;
                            return data1.map((obj, i) => {
                                if(obj.seen === false && obj.sender !== Meteor.userId() && obj.conversationsId === data._id) {
                                    ++count;
                                }
                                if(msgListSize === i + 1) {
                                    return(
                                        <Link to={"/msg/"+ user._id} key={++x}>
                                            <ListGroupItem header={user.username} className={count > 0 ? "list-group-item-info" : ""} key={++x}>
                                                {obj.content} {count > 0 ? <Badge pullRight={true}>unread {count}</Badge>: ""}
                                            </ListGroupItem>
                                        </Link>
                                    );
                                }
                            });
                        }
                    });
                });
            });
        }
    }

    render() {

        return(
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="controlled-tab-example">
                <Tab eventKey={1} title="Messages">
                    <ListGroup>
                        {this.renderMessages()}
                    </ListGroup>
                </Tab>
                <Tab eventKey={2} title="Contacts">
                    <Contacts />
                </Tab>
                <Tab eventKey={3} title="Account">
                    <Accounts />
                </Tab>
            </Tabs>
        );
    }

}


export default withTracker(() => {
    Meteor.subscribe('conversations');
    Meteor.subscribe('messages');
    return {
        chat: convo.find({conversations:{$all:[Meteor.userId()]}}).fetch(),
        msg: messagesData.find({}).fetch(),
        //countUnSeen: convo.find({messages:{seen: { $ne: true }}}).fetch(),
        usersData: Meteor.users.find({}).fetch(),
    };
})(Conversations);