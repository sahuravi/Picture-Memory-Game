let myObj = {};

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
            Object.defineProperty(myObj, className, {
                configurable: true,
                enumerable: true,
                set: function (newValue) {debugger;
                    for (let index = 0; index < elements.length; index++) {
                        elements[index].value = newValue;
                    }
                    this.temp = newValue;
                },
                get: function () {
                    return elements[0].value;
                }
            });
        });
    };
    attachEvent(bindClasses);
})();

myObj.name = "Ravi";