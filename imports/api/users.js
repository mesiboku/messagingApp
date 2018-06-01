import {Meteor} from "meteor/meteor";
import { check } from 'meteor/check';

if (Meteor.isServer) {
    // This code only runs on the server
    // Only publish tasks that are public or belong to the current user
    Meteor.publish('users', usersPublications = () => {
        return  Meteor.users.find({});
    });
}

Meteor.methods({
    'updateUserData.user'(data) {
        check(data.firstName, String);
        check(data.lastName, String);
        check(data.email, String);
        check(data.username, String);
        check(data._id, String);


        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let findUser = Meteor.users.findOne({_id: data._id});
        let test =Meteor.users.update({_id: data._id},{ $set:{username: data.username,
                emails:[{
                    address: data.email,
                    verified: findUser.emails[0].verified
                }] ,
                'profile.firstName': data.firstName,
                'profile.lastName': data.lastName}});
        console.log(test);
    }
});