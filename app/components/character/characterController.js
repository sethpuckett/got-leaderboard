angular.module('gotLeaderboardApp').controller('CharacterController', function ($scope, characterService) {
	characterService.getCharacters(function(chars) {
		$scope.characters = chars;
		$scope.$apply();
	});
});