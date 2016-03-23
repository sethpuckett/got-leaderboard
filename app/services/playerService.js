var Tabletop = require('tabletop');

angular.module('gotLeaderboardApp').factory('playerService', function() {
	return {
		getPlayers: function(callback) {
			Tabletop.init( { 
				key: '1GxP0oUUJbpRrX5fFMDrr7Z-fWIJ1n40eA1ldlqnrCH0',
            	callback: callback,
            	simpleSheet: true } );
     }
   }
});