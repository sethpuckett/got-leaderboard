angular.module('gotLeaderboardApp').controller('CharacterController', function ($scope, $timeout, $q, characterService, playerService) {
	var votesSet = false;

	var showRefresh = function() {
		$timeout(function() { $scope.refreshing = true; });
	}

	var hideRefresh = function() {
		$timeout(function() { $scope.refreshing = false; });
	};

	var setCharacterVotes = function () {
		var votePromises = [];
		playerService.getPlayers().then(function (players) {
			angular.forEach(players, function (player) {
				votePromises.push(playerService.getPlayerVotes(player.Name));
			});
			$q.all(votePromises).then(function (voteArray) {
				angular.forEach($scope.characters, function (character) {
					characterService.getCharacterVotes(character.Name, voteArray).then(function (count) {
						character.VoteCount = count;
					});
				});
			});
		});
	}

	var refreshCharacters = function() {
		showRefresh();
		characterService.getCharacters(true).then(function (chars) {
			$timeout(function() { 
				$scope.characters = chars; 

				if (!votesSet) {
					setCharacterVotes();
					votesSet = true;
				}
			});

			$timeout(hideRefresh, 1000);
		});

		$timeout(refreshCharacters, 10000);
	};

	refreshCharacters();
});