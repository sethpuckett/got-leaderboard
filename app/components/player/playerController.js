angular.module('gotLeaderboardApp').controller('PlayerController', function ($scope, $timeout, $q, playerService, characterService) {
	var refreshScores = function() {
		playerService.getPlayers().then(function(players) {
			$scope.players = players;

			var promises = [];
			angular.forEach($scope.players, function(player) {
				var votePromise = playerService.getPlayerVotes(player.Name);
				promises.push(votePromise);
				votePromise.then(function (votes) {
					player.VoteList = votes;
					var scorePromise = playerService.getPlayerScore(player.Name);
					promises.push(scorePromise);
					scorePromise.then(function (score) {
						player.Score = score;
					});
				});
			});

			$q.all(promises).then(function () {
				$scope.refreshing = false;
			});

			$timeout(function() { $scope.$apply(); });
		});
		$timeout(refreshScores, 60000);
	}

	$scope.refreshing = true;
	refreshScores();
});