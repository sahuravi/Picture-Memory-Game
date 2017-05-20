let myApp = angular.module('workerApp', []);

myApp.controller('WorkerController', ['$rootScope', '$scope', '$timeout', 'workerService', function ($rootScope, $scope, $timeout, workerService) {

    $scope.selectedWorker = null;
    $scope.workAssigned = false;
    $scope.taskName = null;
    $scope.taskDuration = null;
    
    workerService.getWorkersData()
        .then((workersData) => {
            $scope.workersData = workersData;
        })
        .catch((error) => {
            console.log(error);
        });

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
        $scope.workersData.forEach(function (worker) {
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