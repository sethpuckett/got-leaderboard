angular.module('gotLeaderboardApp').controller('PlayerController', function ($scope, $timeout, playerService, characterService) {
	var refreshScores = function() {
		playerService.getPlayers().then(function(players) {
			$scope.players = players;

			angular.forEach($scope.players, function(player) {
				playerService.getPlayerVotes(player.Name).then(function (votes) {
					player.VoteList = votes;
					playerService.getPlayerScore(player.Name).then(function (score) {
						player.Score = score;
					});
				});
			});

			$timeout(function() { $scope.$apply(); });
		});
		$timeout(refreshScores, 3000);
	}

	refreshScores();
});