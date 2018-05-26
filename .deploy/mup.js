module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'ec2-52-14-63-241.us-east-2.compute.amazonaws.com',
      //username: 'ubuntu',
       pem: '~/.ssh/authorized_keys'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  app: {
    // TODO: change app name and path
    name: 'messagingApp',
    path: '../messagingApp',

    servers: {
      one: {
          host: 'ec2-52-14-63-241.us-east-2.compute.amazonaws.com',
          //username: 'ubuntu',
          pem: '~/.ssh/authorized_keys'
          // password: 'server-password'
          // or neither for authenticate from ssh-agent
      },
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://ec2-52-14-63-241.us-east-2.compute.amazonaws.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.4.0-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

  // proxy: {
  //   domains: 'mywebsite.com,www.mywebsite.com',

  //   ssl: {
  //     // Enable Let's Encrypt
  //     letsEncryptEmail: 'email@domain.com'
  //   }
  // }
};
