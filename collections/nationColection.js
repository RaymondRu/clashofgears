Nations = new Meteor.Collection('nations');

if (Meteor.isServer) {
    Meteor.publish('nations', function () {
        return Nations.find();
    });
}

if (Meteor.isClient) {
    Meteor.subscribe('nations')
}

Meteor.methods({
    createNation: function (name) {
        var nation = NationFactory.createNation(Meteor.userId(),name);
        Nations.insert(nation);
    }
});    