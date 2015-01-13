  Meteor.startup(function () {
    Meteor.setInterval(function() {
        Nations.find({}).map(function(nation) {
        Nations.update({_id: nation._id}, {$inc: {'resources.gold': Math.floor(nation.population*(1/10)),
                                                  'resources.wood': Math.floor(1+(2*nation.resourceBuildings.wood)),
                                                  'resources.food': Math.floor(1+(2*nation.resourceBuildings.food)),
                                                  'resources.iron': Math.floor(1+(2*nation.resourceBuildings.iron)),
                                                  'resources.coal': Math.floor(1+(2*nation.resourceBuildings.coal))
                                      }})
      });
    }, 1000)
});
