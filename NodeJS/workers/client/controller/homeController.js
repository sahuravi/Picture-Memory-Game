myApp.controller('homeController', ['$scope', '$state', 'compareService', '$rootScope', '$timeout', function ($scope, $state, compareService, $rootScope, $timeout) {

  $scope.selectedUser = null;
  $scope.workToBeAssigned = false;
  $scope.userData = $rootScope.userData.userArray;
  $scope.ringBell = function () {
    for (var user in $scope.userData) {
      var user = $scope.userData[user];
      if (user.status === 'idle') {
        alert('Hi Assign work to ' + user.name);
        $scope.workToBeAssigned = true;
        $scope.selectedUser = user;
        return;
      }
    }
  };

  $scope.assignTask = function () {
    if ($scope.selectedUser) {
      for (var user in $scope.userData) {
        var user = $scope.userData[user];
        if (user.id === $scope.selectedUser.id) {
          user.status = "Occupied";
          (function (user) {
            $timeout(function () {
              $scope.resetUserStatus(user);
            }, parseInt(user.taskDuration) * 1000);
          })(user);
          $scope.workToBeAssigned = false;
          $scope.selectedUser = null;
          return;
        }
      }
    }
  };

  $scope.resetUserStatus = function (resetUser) {
    for (var user in $scope.userData) {
      var user = $scope.userData[user];
      if (user.id === resetUser.id) {
        user.status = "idle";
        delete user.workname;
        delete user.taskDuration;
        return;
      }
    }
  }



}]);