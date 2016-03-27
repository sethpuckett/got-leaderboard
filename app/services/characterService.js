var Tabletop = require('tabletop');

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

	return {
		getCharacters: thisService.getCharacters
	}
});