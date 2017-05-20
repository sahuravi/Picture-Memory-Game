
myApp.service('workerService', function ($http) {
    this.getWorkersData = function () {
        return $http.get('../data/workers.json')
            .then((successData) => {
                return successData.data.workers;
            });
    }
});