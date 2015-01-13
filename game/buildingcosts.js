woodNext =  function () {
	var nextLevel =  Meteor.user().woodProduction + 1;
	var gold = Math.ceil(Math.pow(2.3,(nextLevel+10)));
	var wood = Math.ceil(Math.pow(2.0,(nextLevel+10)));
	var ore = Math.ceil(Math.pow(1.9,(nextLevel+10)));
	woodBuildingCost = {
		level: nextLevel,
		gold : gold,
		wood : wood,
		ore  :ore
	};
	return woodBuildingCost;
}