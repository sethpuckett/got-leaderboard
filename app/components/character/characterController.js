angular.module('gotLeaderboardApp').controller('CharacterController', function ($rootScope, characterService) {
	console.log('characterCtrl loaded');
	this.$routerOnActivate = function () {
		characterService.getCharacters(function(chars) {
			this.characters = chars;
		});
	};
});