angular.module('gotLeaderboardApp').factory('homeService', function() {
	return {
		getCharacters: function() {
		return [{ name: "test1" }, { name: "test2" }, { name: "test3" }];
     }
   }
});