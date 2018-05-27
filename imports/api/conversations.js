import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Conversations = new Mongo.Collection('conversations');


if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('conversations', conversationPublications = () => {
        return Conversations.find();
    });
}


Meteor.methods({
    'conversations.insert'(data) {
        check(data, Object);


        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Conversations.insert(data);
    }
});