/**
 * Created by Roman on 16.12.13.
 */

exports.register = function(module){
    module.factory('$api', function($http){
        return new exports.ApiService($http);
    });
};

exports.ApiService = function($http){
    var ctrl = this;
    var bitstamp = ctrl.bitstamp = {};

    bitstamp.get_price = function(){
        return $http.get('/api/bitstamp/price');
    };

    bitstamp.get_transactions = function(api_key, api_secret, client_id){
        return $http.post('/api/bitstamp/transactions', {api_key: api_key, api_secret: api_secret, client_id: client_id});
    };
};