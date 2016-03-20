require('angular');
require('angular-resource');

angular.module('gotLeaderboardApp', ['ngResource']);

require('./services/characterService');
require('./character/characterController');