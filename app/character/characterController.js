angular.module('gotLeaderboardApp').controller('characterCtrl', function ($scope, characterService) {
	var chars = characterService.getCharacters();
	$scope.characters = chars;
});