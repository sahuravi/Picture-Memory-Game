let myApp = angular.module('workerApp', []);

myApp.run(['$rootScope', '$http', function ($rootScope, $http) {

    let workerJson = {
        "workers": [
            {
                "name": "Tim Dowd",
                "mobileNumber": "+122-7485964152",
                "taskAssigned": "Manage files",
                "taskDuration": 5
            },
            {
                "name": "Jane Mistro",
                "mobileNumber": "+122-1527485964",
                "taskAssigned": "Verify machine status",
                "taskDuration": 10
            },
            {
                "name": "Jerry Lucas",
                "mobileNumber": "+122-9641527485",
                "taskAssigned": "Monitor power management",
                "taskDuration": 3
            },
            {
                "name": "Tyra Kindo",
                "mobileNumber": "+122-5964157482",
                "taskAssigned": ""
            },
            {
                "name": "Cesar Monk",
                "mobileNumber": "+122-4152748596",
                "taskAssigned": "Order Management",
                "taskDuration": 5
            },
            {
                "name": "Zed Mills",
                "mobileNumber": "+122-6415274859",
                "taskAssigned": ""
            },
            {
                "name": "Kera Hoadely",
                "mobileNumber": "+122-7596415482",
                "taskAssigned": ""
            },
            {
                "name": "Craig Hoadely",
                "mobileNumber": "+122-5967484152",
                "taskAssigned": "Insert Cotton",
                "taskDuration": 7
            },
            {
                "name": "Dee Sather",
                "mobileNumber": "+122-9647485152",
                "taskAssigned": ""
            }
        ]
    };
    $rootScope.workersData = workerJson.workers;

    // $http.get("./workers.json")
    //     .then(function (response) {
    //         debugger
    //         $rootScope.workerData = response.workers;
    //     });
}])

myApp.controller('WorkerController', ['$rootScope', '$scope', '$element', '$timeout', function ($rootScope, $scope, $element, $timeout) {

    //console.log($rootScope.workersData);
    $scope.selectedWorker = null;
    $scope.workAssigned = false;
    $scope.taskName = null;
    $scope.taskDuration = null;

    let workersArray = $rootScope.workersData;

    $scope.assignWorker = function (worker) {
        if (worker.taskAssigned === "") {
            $scope.workAssigned = true;
            $scope.selectedWorker = worker;
            return;
        } else {
            $scope.workAssigned = false;
            $scope.selectedWorker = null;
        }
    }

    $scope.assignTask = function () {
        
        $rootScope.workersData.forEach(function (worker) {
            
            if (worker.mobileNumber === $scope.selectedWorker.mobileNumber) {
                worker.taskAssigned = $scope.taskName;
                worker.taskDuration = $scope.taskDuration;
                (function (worker) {
                    $timeout(function () {
                        worker.taskAssigned = "";
                        delete worker.taskDuration;
                    }, parseInt(worker.taskDuration) * 1000);
                })(worker);
            }
        });
    }
}]);