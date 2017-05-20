'use strict';

(function () {
    angular.module('workerApp')
        .directive('workerDirective', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    'updated': '=owlDataUpdated',
                    'owlOptions': '=owlOptions'
                },
                link: function ($scope, $element, attrs, controller) {
                    $timeout(function () {
                        var listener = $scope.$watch('updated', function () {
                            if ($scope.updated != undefined) {
                                $element.owlCarousel($scope.owlOptions);
                                listener();
                            }
                        });
                    });
                }
            };
        }]);
}());