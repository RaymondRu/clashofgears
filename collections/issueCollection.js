Issues = new Meteor.Collection('issues');

if (Meteor.isServer) {
    Meteor.publish('issues', function () {
        return Issues.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('issues')
}

