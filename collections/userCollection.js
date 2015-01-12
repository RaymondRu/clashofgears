if (Meteor.isServer) {
    Meteor.publish('users', function () {
        return Meteor.users.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('users');
}