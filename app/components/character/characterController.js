angular.module('gotLeaderboardApp').controller('CharacterController', function ($scope, $timeout, characterService) {
	var showRefresh = function() {
		$timeout(function() { $scope.refreshing = true; });
	}

	var hideRefresh = function() {
		$timeout(function() { $scope.refreshing = false; });
	};

	var refreshCharacters = function() {
		showRefresh();
		characterService.getCharacters(function(chars) {
			$timeout(function() { $scope.characters = chars; });

			$timeout(hideRefresh, 1000);
		});

		$timeout(refreshCharacters, 10000);
	};

	refreshCharacters();
});