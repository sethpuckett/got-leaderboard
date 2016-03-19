angular.module('gotLeaderboardApp').controller('HomeCtrl', function ($scope, homeService) {
	var chars = homeService.getCharacters();
	$scope.characters = chars;
});