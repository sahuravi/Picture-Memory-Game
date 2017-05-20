myApp.controller('compareController', ['$scope', '$state', 'compareService', function($scope, $state, compareService) {
    
    $scope.comparisionData = compareService.GetphoneCompareData();
    //compareService.clearphoneCompareList();

    $scope.home = function(){
        $state.transitionTo('home');
    };

}]);

