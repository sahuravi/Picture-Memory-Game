let myApp = angular.module('workerApp', ['ngAnimate']);
myApp.run(['$rootScope', function ($rootScope) {
    $rootScope.isLoading = true;
}]);

myApp.controller('WorkerController', ['$rootScope', '$scope', '$timeout', 'workerService', '$element', function ($rootScope, $scope, $timeout, workerService, $element) {

    $scope.selectedWorker = null;
    $scope.workAssigned = false;
    $scope.taskName = null;
    $scope.taskDuration = null;

    workerService.getWorkersData()
        .then((workersData) => {
            $rootScope.isLoading = false;
            $scope.workersData = workersData;
            $scope.startCountdonw();
        })
        .catch((error) => {
            console.log(error);
        });

    $scope.assignWorker = function (worker, $event) {
        let workerDivs = $event.currentTarget.parentElement.children;
        let workersLen = workerDivs.length;
        for (let index = 0; index < workersLen; index++) {
            workerDivs[index].classList.add("deselected");
        }
        $event.currentTarget.classList.remove("deselected");
        $event.currentTarget.classList.add("selected");

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

    $scope.startCountdonw = function () {
        $scope.workersData.forEach(function (worker) {
            (function (worker) {
                $timeout(function () {
                    worker.taskAssigned = "";
                    delete worker.taskDuration;
                }, parseInt(worker.taskDuration) * 1000);
            })(worker);
        });
    }
}]);