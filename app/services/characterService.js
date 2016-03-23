var Tabletop = require('tabletop');

angular.module('gotLeaderboardApp').factory('characterService', function() {
	return {
		getCharacters: function(callback) {
			Tabletop.init( { 
				key: '1dHfPewrEsLE_RkagwcSUnGom0zI8YvTImhACVVdHXMc',
            	callback: callback,
            	simpleSheet: true } );
     }
   }
});