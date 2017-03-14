var Tabletop = require('tabletop');
var _ = require('underscore');

angular.module('gotLeaderboardApp').factory('characterService', function($q) {
    var thisService = this;

    thisService.getCharacters = function(refresh) {
        return $q(function(resolve, reject) {
            if (thisService.characters != null && !refresh) {
                resolve(thisService.characters);
            } else {
                Tabletop.init({
                    key: '1dHfPewrEsLE_RkagwcSUnGom0zI8YvTImhACVVdHXMc',
                    callback: function(data, tabletop) {
                        thisService.characters = tabletop.sheets('season-06').all();
                        resolve(thisService.characters);
                    }
                });
            }
        });
    };

    thisService.getCharacterVotes = function(characterName, votesArray) {
        return $q(function(resolve, reject) {
            var count = 0;
            angular.forEach(votesArray, function(votes) {
                if (_.find(votes, function(vote) { return vote.Name === characterName }) !== undefined) {
                    count++;
                }
            });
            resolve(count);
        });
    };

    thisService.isAlive = function(characterName) {
        return $q(function(resolve, reject) {
            thisService.getCharacters().then(function(characters) {
                var character = _.find(characters, function(character) { return character.Name === characterName });
                resolve(character.Alive === "TRUE");
            });
        });
    }

    return {
        getCharacters: thisService.getCharacters,
        getCharacterVotes: thisService.getCharacterVotes,
        isAlive: thisService.isAlive
    }
});