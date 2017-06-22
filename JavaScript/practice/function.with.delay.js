var sum = {
    'delay': function delay() {
        let delayTime = Array.prototype.slice.call(arguments, 0, 1);
        let sumArgs = Array.prototype.slice.call(arguments, 1);

        let calculate = () => {
            let sum = sumArgs.reduce((acc, element) => {
                return acc + element;
            });
            console.log(sum);
        }
        setTimeout(calculate, delayTime);
    }
}
sum.delay(1000, 2, 4);


// 
Function.prototype.delay = function () {
    let delayTime = Array.prototype.slice.call(arguments, 0, 1)[0];
    let args = Array.prototype.slice.call(arguments, 1);
    let calculate = () => {
        this.apply(this, args);
    }
    setTimeout(calculate, delayTime);
}

function sum1(a, b) {
    let sumArgs = Array.prototype.slice.call(arguments);
    let sum = sumArgs.reduce((acc, element) => {
        return acc + element;
    });
    console.log(sum);
}

sum1.delay(1000, 2, 3);