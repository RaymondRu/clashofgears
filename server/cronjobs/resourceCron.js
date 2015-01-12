  Meteor.startup(function () {
    Meteor.setInterval(function() {
        Nations.find({}).map(function(nation) {
        Nations.update({_id: nation._id}, {$inc: {'resources.gold': Math.floor(nation.population*(1/10)),
                                                  'resources.wood': Math.ceil(1+(2*nation.resourceBuildings.wood)),
                                                  'resources.food': Math.ceil(1+(2*nation.resourceBuildings.food)),
                                                  'resources.iron': Math.ceil(1+(2*nation.resourceBuildings.iron)),
                                                  'resources.coal': Math.ceil(1+(2*nation.resourceBuildings.coal))
                                      }})
      });
    }, 1000)
});
