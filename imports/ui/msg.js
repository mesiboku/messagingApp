import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Panel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Conversations as convo } from '../api/conversations';
import { Messages as messagesData } from '../api/messages';


class Msg extends Component {

    constructor(props){
        super(props);
            this.state = {
            }
    }

    componentWillMount(){
        if(this.props.chat !== undefined) {
                let data = this.props.chat._id;
                let sender = this.props.match.params.id
                Meteor.call('messages.setSeen', data,sender);

        }
    }
    componentDidUpdate() {
        if(this.props.chat !== undefined) {
            let data = this.props.chat._id;
            let sender = this.props.match.params.id
            Meteor.call('messages.setSeen', data,sender);

        }
    }


    handleSubmit(e){
        e.preventDefault();
        let msg = convo.findOne({conversations: {$all:[Meteor.userId(),this.props.match.params.id]}});

        if(msg) {
            //Already Had Existing Conversations So Update
            let data = {
                conversationsId: msg._id,
                sender:  Meteor.user()._id,
                receiver: this.props.match.params.id,
                content: ReactDOM.findDOMNode(this.refs.text).value.trim(),
                createAt: new Date(),
                seen: false
            }
            Meteor.call('messages.insert', data);
        } else  {
            let conversations = {
                conversations: [
                    Meteor.userId(),
                    this.props.match.params.id

                ]
            }
            Meteor.call('conversations.insert', conversations);
            let convoData = convo.findOne({conversations: {$all:[Meteor.userId(),this.props.match.params.id]}});
            if(convoData) { //Check if Conversations is Exist
                let messages =   {
                   conversationsId: convoData._id,
                   sender:  Meteor.user()._id,
                   receiver: this.props.match.params.id,
                   content: ReactDOM.findDOMNode(this.refs.text).value.trim(),
                   createAt: new Date(),
                   seen: false
               }
                Meteor.call('messages.insert', messages);
            }



        }
        ReactDOM.findDOMNode(this.refs.text).value = '';
    }

    renderMsg() {
        const msg = this.props.chat;
        const msgList = this.props.messages;
        const userData = Meteor.users.findOne({_id : this.props.match.params.id});
        if(msg != undefined) {
            if(msgList != undefined) {
                let x = 0;
                return msgList.map((data) =>{
                    if(msg._id === data.conversationsId) {
                        if(data.sender === Meteor.userId()) {
                            return(
                                <div className="well well-sm text-right" key={++x}>
                                    {data.content} :Me
                                </div>
                            );
                        } else {
                            return(
                                <div className="well well-sm " key={++x}>
                                    {userData.username}: {data.content}
                                </div>
                            );
                        }
                    }
                });
            }
        }
    }
    render() {
        let userData = Meteor.users.findOne({_id : this.props.match.params.id});
        return(
            <div className="container-fluid">
                <div className={"row"}>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-sx-12">
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">
                                    {userData.username}
                                    <Link to={"/"} className="btn btn-default pull-right btn-xs">Back</Link>
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                {this.renderMsg()}
                            </Panel.Body>
                        </Panel>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-sx-12">
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="input-group">
                                <input type="text" className="form-control"  ref="text" placeholder={"Enter Chat....."} required={true}/>
                                <div className="input-group-btn">
                                    <button className="btn btn-default" type="submit">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default withTracker((props) => {
    Meteor.subscribe('users');
    Meteor.subscribe('conversations');
    Meteor.subscribe('messages');
    return {
        chat: convo.findOne({conversations:{$all:[Meteor.userId(),props.match.params.id]}}),
        messages: messagesData.find({}).fetch(),
        user: Meteor.users.find({_id:props.match.params.id}).fetch(),
    };
})(Msg);