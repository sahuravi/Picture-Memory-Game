let myApp = angular.module('workerApp', []);

myApp.run(['$rootScope', '$http', function ($rootScope, $http) {debugger

   $http.get("./workers.json")
        .then(function(response) {debugger
              $rootScope.workerData = response.workers;
    });
}])

myApp.controller('WorkerController', ['$scope', function($scope) {debugger;
    console.log("ravi");
}]);