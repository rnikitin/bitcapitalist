/**
 * Created by Roman on 16.12.13.
 */

function MainController($scope){
    var ctrl = this;

    $scope.is_authenticated = store.get('is_authenticated');

    $scope.authenticated = function(){
        $scope.is_authenticated = true;
        store.set('is_authenticated', $scope.is_authenticated);
    };

    $scope.terminate_session = function(){
        store.clear();
        window.location.reload();
    }
}

module.exports = MainController;