this.HomePrivateNationController = RouteController.extend({
	template: "HomePrivate",

	yieldTemplates: {
		'HomePrivateNation': { to: 'PrivateSubcontent'}
		/*YIELD_TEMPLATES*/
	},
	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
		this.next();
	},
	action: function() {
		this.render();
		/*ACTION_FUNCTION*/
	},
	waitOn: function() {
		return [
		];
		/*WAIT_FUNCTION*/
	},
	data: function() {
		nation = Nations.findOne({owner: Meteor.userId()});
		if (nation){
			return nation;
		}
	},
	onAfterAction: function() {
	}
});