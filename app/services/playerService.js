var Tabletop = require('tabletop');
var _ = require('underscore');

angular.module('gotLeaderboardApp').factory('playerService', ['$q', 'playerSheet', function($q, playerSheet, characterService) {
    var thisService = this;

    thisService.getPlayers = function() {
        return $q(function(resolve, reject) {
            if (thisService.players != null) {
                resolve(thisService.players);
            } else {
                Tabletop.init({
                    key: '1GxP0oUUJbpRrX5fFMDrr7Z-fWIJ1n40eA1ldlqnrCH0',
                    callback: function(data, tabletop) {
                        thisService.players = tabletop.sheets(playerSheet).all();
                        resolve(thisService.players);
                    }
                });
            }
        });
    };

    thisService.getPlayerScore = function(playerName) {
        return $q(function(resolve, reject) {
            thisService.getPlayerVotes(playerName).then(function(voteList) {
                characterService.getCharacters().then(function(characters) {
                    var score = 0;

                    angular.forEach(characters, function(character) {
                        var votedFor = _.find(voteList, function(vote) {
                            return vote.Name === character.Name;
                        }) != undefined;

                        var alive = character.Alive.toUpperCase() === "TRUE";

                        if (votedFor && !alive) {
                            score += 4;
                        } else if (!votedFor && alive) {
                            score += 1;
                        }
                    });

                    resolve(score);
                });
            });
        });
    };

    thisService.getPlayerVotes = function(playerName) {
        return $q(function(resolve, reject) {
            thisService.getPlayers().then(function(players) {
                var player = _.find(players, function(p) { return p.Name == playerName; });
                var voteNames = player.Votes.split(';');
                voteNames = voteNames.map(function(v) { return v.trim() });

                var votes = [];
                var votePromises = [];
                angular.forEach(voteNames, function(voteName) {
                    votePromises.push(characterService.isAlive(voteName));
                });
                $q.all(votePromises).then(function(voteResponses) {
                    angular.forEach(voteNames, function(voteName, index) {
                        votes.push({ Name: voteName, Alive: voteResponses[index] });
                    });
                    resolve(votes);
                });
            });
        });
    };

    return {
        getPlayers: thisService.getPlayers,
        getPlayerScore: thisService.getPlayerScore,
        getPlayerVotes: thisService.getPlayerVotes
    };
}]);