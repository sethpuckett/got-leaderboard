var Tabletop = require('tabletop');
var _ = require('underscore');

angular.module('gotLeaderboardApp').factory('playerService', function ($q, characterService) {
    var thisService = this;

    thisService.getPlayers = function() 
    { 
        return $q(function(resolve, reject) {
            if (thisService.players != null) {
                resolve(thisService.players);
            } else {
                Tabletop.init( { 
                    key: '1GxP0oUUJbpRrX5fFMDrr7Z-fWIJ1n40eA1ldlqnrCH0',
                    callback: function(players) { 
                        thisService.players = players; 
                        resolve(players); 
                    },
                    simpleSheet: true } );
            }
        });
    };

    thisService.getPlayerScore = function(playerName) {
        return $q(function (resolve, reject) {
            thisService.getPlayerVotes(playerName).then(function (voteList) {
                characterService.getCharacters().then(function (characters) {
                    var score = 0;

                    angular.forEach(characters, function (character) {
                        var votedFor = _.find(voteList, function(vote) {
                            return vote == character.Name;
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
        return $q(function (resolve, reject) {
            thisService.getPlayers().then(function (players) {
                var player = _.find(thisService.players, function(p) { return p.Name == playerName; });
                var votes = player.Votes.split(';');
                votes = votes.map(function(v) { return v.trim() });
                resolve(votes);
            });
        });

    };

    return {
        getPlayers: thisService.getPlayers,
        getPlayerScore: thisService.getPlayerScore,
        getPlayerVotes: thisService.getPlayerVotes
   };
});