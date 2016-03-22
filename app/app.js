require('angular');
require('angular-resource');
require('angular-new-router');

var app = angular.module('gotLeaderboardApp', ['ngResource', 'ngNewRouter'])
  .config(['$componentLoaderProvider', function($componentLoaderProvider){
    $componentLoaderProvider.setTemplateMapping(function (name) {
      return 'app/components/' + name + '/' + name + '.html';
    });
}]);

app.controller('AppController', function($scope, $router) {
	console.log("appCtrl loaded");
	$router.config([
    {
      path: '/',
      components: {
      	'char': 'character'
      }
    }]);
});

require('./services/characterService');
require('./components/character/characterController');