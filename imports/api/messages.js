import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import ReactDOM from "react-dom";


export const Messages = new Mongo.Collection('messages');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('messages', messagesPublications = () => {
        return Messages.find();
    });
}


Meteor.methods({
    'messages.insert'(data) {
        check(data, Object);
        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Messages.insert(data);
    },
    'messages.setSeen'(data) {
        check(data, Object);

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }


    }
});