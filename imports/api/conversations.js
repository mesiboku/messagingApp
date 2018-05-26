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
    },
    /*'conversations.setSeen'(_id, data) {
        check(_id, String);

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let convo = Conversations.update({_id: _id, conversations:{$all:[Meteor.userId(),data.name]},
            messages:{$elemMatch:{name: data.username}, $elemMatch: {seen:false}}},{ $set: {'messages.$.seen': data.seen}});

        let test = Conversations.findOne({_id: _id, conversations:{$all:[Meteor.userId(),data.name]},
            messages:{$elemMatch:{name: data.username}}});
        console.log(test)
        console.log(data.name);
        console.log(convo);


    },
    'conversations.update'(_id, data) {

        check(_id, String);
        check(data, Object);

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Conversations.update(_id,{ $push: { messages: {
                    name: data.name,
                    content: data.content,
                    createAt: new Date(),
                    seen: data.seen
                }
            }
        });
    }*/
});