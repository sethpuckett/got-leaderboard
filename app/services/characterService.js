angular.module('gotLeaderboardApp').factory('characterService', function($resource) {
	return {
		getCharacters: function(callback) {
			var characters = $resource("http://localhost:2403/characters", {}, {
      			get: {method: 'GET', isArray: true}});
			returncharacters.get({}, callback);
     }
   }
});