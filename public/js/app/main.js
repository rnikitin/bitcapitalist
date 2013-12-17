/**
 * Created by Roman on 16.12.13.
 */

var MainController = require('./controllers/MainController');
var AuthController = require('./controllers/AuthController');
var BitstampStatsController = require('./controllers/BitstampStatsController');
var ApiService = require('./lib/ApiService');

// register the app
var bitcapitalistApp = angular.module('bitcapitalistApp', []).config(function(){

});

// register services
ApiService.register(bitcapitalistApp);

// register controllers
bitcapitalistApp.controller("MainController", MainController);
bitcapitalistApp.controller("AuthController", AuthController);
bitcapitalistApp.controller("BitstampStatsController", BitstampStatsController);

