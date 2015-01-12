Template.nationCreate.events ({

    'submit form': function (evt,template) {
		evt.preventDefault();
    	var nationName = template.find('#nation').value;
        Meteor.call('createNation', nationName);
    }
});
