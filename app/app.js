require('angular');
require('angular-resource');
require('angular-ui-router');

var app = angular.module('gotLeaderboardApp', ['ngResource', 'ui.router']);

require('./services/characterService');
require('./services/playerService');
require('./components/character/characterController');
require('./components/player/playerController');