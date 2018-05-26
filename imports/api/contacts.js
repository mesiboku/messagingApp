import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Contacts = new Mongo.Collection('contacts');




if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('contacts', contactPublication = () => {
        return Contacts.find();
    });
}


Meteor.methods({
    'contacts.insert'(data) {
        console.log(data.email)
        console.log(data.contactOwner)
        check(data.email, String, (err) => {
            if(err) {
                throw new Error(err);
            }
        });
        check(data.contactOwner, String, (err) => {
            if(err) {
                throw new Error(err);
            }
        });


        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        const contact = Contacts.findOne({email: data.email, contactOwner: Meteor.userId()});
        if(contact) {
            throw new Meteor.Error('Email already in contact');
        }

        let userExist = Meteor.users.findOne({email: data.email});
        console.log(userExist)
        console.log(userExist === null || userExist === undefined)
        /*if(userExist === null) {
            throw new Meteor.Error("User doesn't Exist");
        }*/

        Contacts.insert({
            email: data.email,
            contactOwner: this.userId,
            createdAt: new Date()
        });
    },
    'contacts.remove'(contactId) {
        const contact = Contacts.findOne(contactId);
        if( (!this.userId) && (contact.contactOwner === this.userId)) {
            throw new Meteor.Error('not-authorized');
        }
        Contacts.remove(contactId);
    }
});