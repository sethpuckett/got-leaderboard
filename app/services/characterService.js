var Tabletop = require('tabletop');
var _ = require('underscore');

angular.module('gotLeaderboardApp').factory('characterService', function($q) {
	var thisService = this;

	thisService.getCharacters = function (refresh) {
		return $q(function (resolve, reject) {
	        if (thisService.characters != null && !refresh) {
	            resolve(thisService.characters);
	        } else {
	            Tabletop.init( { 
	                key: '1dHfPewrEsLE_RkagwcSUnGom0zI8YvTImhACVVdHXMc',
	                callback: function (characters) { 
	                    thisService.characters = characters; 
	                    resolve(characters); 
	                },
	                simpleSheet: true } );
	        }
		});
    };

    thisService.getCharacterVotes = function (characterName, votesArray) {
    	return $q(function (resolve, reject) {
    		var count = 0;
			angular.forEach(votesArray, function (votes) {
				if (_.find(votes, function (vote) { return vote === characterName }) !== undefined) {
					count++;
				}
			});
			resolve(count);
    	});
    };

	return {
		getCharacters: thisService.getCharacters,
		getCharacterVotes: thisService.getCharacterVotes
	}
});