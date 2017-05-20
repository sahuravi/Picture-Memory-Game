var myApp = angular.module("workerApp", ["ui.router"]);

myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partial/home.html',
            controller: "homeController"
        })
        .state('compare', {
            url: '/compare',
            templateUrl: 'partial/compare.html'  ,     
            controller: "compareController"
        });
        
}]);

myApp.run(['$state', '$rootScope', '$http', function ($state, $rootScope,$http) {debugger
   $state.transitionTo('home');
   $http.get("data/worders.json")
        .then(function(response) {debugger
              $scope.myWelcome = response.data;
    });
}])