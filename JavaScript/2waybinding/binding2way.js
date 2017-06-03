let $scope = {};
(function () {
    let bindClasses = ["name", "age"];
    let attachEvent = function (classNames) {
        classNames.forEach(function (className) {
            let elements = document.getElementsByClassName(className);
            for (let index in elements) {
                elements[index].onkeyup = function () {
                    for (let index in elements) {
                        elements[index].value = this.value;
                    }
                }
            }
            Object.defineProperty($scope, className, {
                configurable: true,
                enumerable: true,
                set: function (newValue) {
                    for (let index in elements) {
                        elements[index].value = newValue;
                    }
                }
            });
        });
    };
    attachEvent(bindClasses);
})();

$scope.name = "Ravi";