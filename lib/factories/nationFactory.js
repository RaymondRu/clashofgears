NationFactory = {};

NationFactory.createNation = function (playerId, name) {

	var attributes = createAttributes();
	var resources = createResources();
	var resourceBuildings = createBuildings();
   	
    return {
    	name: name,
    	owner: playerId,
    	questionProgress: 3,
    	questionsAnswered: [],
    	attributes: attributes,
    	resources: resources,
    	population: 100,
    	resourceBuildings: resourceBuildings,
	    created: new Date()
	};
};


function createResources () {
	
	return {
		gold: 0,
		wood: 0,
		food: 0,
		iron: 0,
	}
}

function createBuildings () {

	return {
		wood: 0,
		food: 0,
		iron: 0
	}
}


function  createAttributes() {
	
	return {
		goldBonus: 			0,
		coalBonus: 			0,
		ironBonus: 			0,
		foodBonus: 			0,
		woodBonus: 			0,
		populationBonus: 	0,
		defenseBonus:       0,
		offenseBonus: 		0,
		technologyBonus: 	0,
		spyBonus: 			0,
		counterIntelBonus:  0 
	}
}