angular.module('gotLeaderboardApp').controller('PlayerController', function ($scope, playerService) {
	playerService.getPlayers(function(players) {
		$scope.players = players;
		$scope.$apply();
	});
});