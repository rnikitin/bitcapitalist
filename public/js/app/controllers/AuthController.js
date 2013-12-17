/**
 * Created by Roman on 16.12.13.
 */

var moment = require('moment');

function AuthController($scope, $api) {
    var ctrl = this;

    $scope.client_id = store.get('client_id');
    $scope.api_key = store.get('api_key');
    $scope.api_secret = store.get('api_secret');

    $scope.err = null;

    // catch html pieces
    var $modal = $('#modal-auth').modal({backdrop: true, show: false});

    $scope.authenticate_clicked = function(){
        NProgress.start();
        $scope.err = null;

        // validate keys and update scopes
        $api.bitstamp.get_transactions($scope.api_key, $scope.api_secret, $scope.client_id)
            .success(function(transactions){
                $modal.modal('hide');

                // save data
                store.set('client_id', $scope.client_id);
                store.set('api_key', $scope.api_key);
                store.set('api_secret', $scope.api_secret);
                store.set('transactions', transactions);
                store.set('transactions_updated', moment().unix());

                // notify parent that we authenticated
                $scope.$parent.authenticated();

                NProgress.done();
            })
            .error(function(){
                $scope.err = "Failed to verify credentials. Are they correct?";

                NProgress.done();
            });
    };

    // init code
    $('#btn-start').click(function(){
        $modal.modal('show');
    });
}

module.exports = AuthController;

