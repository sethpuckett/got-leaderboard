require('angular');
require('angular-resource');
require('angular-ui-router');

var app = angular.module('gotLeaderboardApp', ['ngResource', 'ui.router']);

app.constant("playerSheet", "season-7");
//app.constant("playerSheet", "season-7-excella");
//app.constant("playerSheet", "season-6");

app.constant("characterSheet", "season-7");
//app.constant("characterSheet", "season-6");

require('./services/characterService');
require('./services/playerService');
require('./components/character/characterController');
require('./components/player/playerController');