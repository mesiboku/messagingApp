App.info({
    id: 'com.arjel.chat',
    name: 'Messanger',
    description: 'Messanger at its gwapo',
    author: 'Arjel Angelo Ramos',
    email: 'arjelangelo.ramos@gmail.com',
    website: 'http://arjelramos.com'
});


// Access Rules
App.accessRule("*");
App.accessRule("https://*.amazonaws.com");
App.accessRule("https://*.facebook.com");
App.accessRule("https://*.googelapis.com");

/*
meteor build ~/home/mesiboku/Meteor-Build --server=http://192.168.1.100:3000 --verbose
*/
