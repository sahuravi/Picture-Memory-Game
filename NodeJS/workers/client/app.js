let myApp = angular.module('workerApp', ['ngAnimate']);
myApp.run(['$rootScope', function ($rootScope) {
    $rootScope.isLoading = true;
}]);