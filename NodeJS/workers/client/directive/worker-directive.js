'use strict';

(function () {
    angular.module('workerApp')
        .directive('workerDirective', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: '../view/worker.template.html',
                scope: {
                    workerDetail: '=',
                    availability: '&'
                },
                controller: function($scope, $element, $attrs) {
                    
                }
            }
        }]);
}());