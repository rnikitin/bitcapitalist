/**
 * Created by Roman on 16.12.13.
 */

var moment = require('moment');

function BitstampStatsController ($scope, $api){

    $scope.last_update = function(){
        return store.get('transactions_updated') ? moment.unix(store.get('transactions_updated')).fromNow() : "never";
    };

    $scope.transactions = store.get('transactions');
    $scope.bitstamp_price = store.get('bitstamp_price');

    $scope.custom_price_enabled = false;
    $scope.price_value = $scope.bitstamp_price ? $scope.bitstamp_price.last : 1000;

    $scope.updated_ago = function(){
        return $scope.bitstamp_price ? moment.unix($scope.bitstamp_price.timestamp).fromNow() : "never";
    };

    $scope.orders = function(){
        return _.filter($scope.transactions, function(t){
            return t.type == 2;
        });
    };

    /// calculators

    $scope.transaction_profit = function(t){
        return $scope.price_value * t.btc - Math.abs(t.usd) - t.fee;
    };

    $scope.total_usd = function(){
        return _.reduce($scope.orders(), function(sum, t){
            return sum + Math.abs(t.usd);
        }, 0);
    };

    $scope.total_fee = function(){
        return _.reduce($scope.orders(), function(sum, t){
            return sum + Math.abs(t.fee);
        }, 0);
    };

    $scope.total_btc = function(){
        return _.reduce($scope.orders(), function(sum, t){
            return sum + Math.abs(t.btc);
        }, 0);
    };

    $scope.total_profit = function(){
        return _.reduce($scope.orders(), function(sum, t){
            return sum + $scope.transaction_profit(t);
        }, 0);
    };

    $scope.update_transactions = function(){
        NProgress.start();

        var client_id = store.get('client_id');
        var api_key = store.get('api_key');
        var api_secret = store.get('api_secret');

        $api.bitstamp.get_transactions(api_key, api_secret, client_id)
            .success(function(transactions){
                // save data
                store.set('transactions', transactions);
                store.set('transactions_updated', moment().unix());

                NProgress.done();
            })
            .error(function(){
                $scope.err = "Failed to verify credentials. Are they correct?";

                NProgress.done();
            });
    };


    /// actions

    $scope.update_price = function(){
        NProgress.start();

        $api.bitstamp.get_price().success(function(price){
            $scope.bitstamp_price = price;
            $scope.price_value = $scope.bitstamp_price.last;
            store.set('bitstamp_price', $scope.bitstamp_price);

            NProgress.done();
        });
    };

    /// startup

    if (!$scope.bitstamp_price){
        $scope.update_price();
    }

    console.log($scope);
}

module.exports = BitstampStatsController;