angular.module('gotLeaderboardApp').controller('CharacterController', function($scope, $timeout, $q, characterService, playerService) {

    var setCharacterVotes = function() {
        var votePromises = [];
        playerService.getPlayers().then(function(players) {
            angular.forEach(players, function(player) {
                votePromises.push(playerService.getPlayerVotes(player.Name));
            });
            $q.all(votePromises).then(function(voteArray) {
                angular.forEach($scope.characters, function(character) {
                    characterService.getCharacterVotes(character.Name, voteArray).then(function(count) {
                        character.VoteCount = count;
                    });
                });
            });
        });
    }

    var refreshCharacters = function() {
        characterService.getCharacters(true).then(function(chars) {
            $timeout(function() {
                $scope.characters = chars;
                setCharacterVotes();
            });

        });

        $timeout(refreshCharacters, 60000);
    };

    refreshCharacters();
});