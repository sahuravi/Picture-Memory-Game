/* Below function can be called by any way:
 *  sum(3)(5,7) or sum(5)(6,6)(5,6) and so on..
 */
function sum() {
    var args = Array.prototype.slice.call(arguments);

    var func = function () {
        var nxtArgs = Array.prototype.slice.call(arguments);
        args = args.concat(nxtArgs);
        return func;
    };

    func.toString = func.valueOf = function () {
        return args.reduce(function (acc, nxtValue) {
            return acc + nxtValue;
        })
    };

    return func;
}

console.log(sum(2, 3, 4).toString());

// Another one.
function applyF(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        }
    }
}

function addf(a, b) {
    return a + b;
}

applyF(addf)(2)(4);

// Write a function that takes a function and an argument, and returns a function that can supply a second argument.
// Ex. add3 = curry(add, 3);
// add3(4);     // 7
// curry(mult, 5)(7)     // 35

function curry(fn, a) {
    return function (b) {
        return fn(a, b);
    }
}

function mult(a, b) {
    return a * b;
}

curry(addf, 4)(9);
curry(mult, 4)(9);

/* Write methodize, a function that converts a binary function to a method.
 *   Ex:  Number.prototype.add = methodize(addf);
 *   (3).add(5);     // 8
 */

function methodize(fn) {
    return function (a) {
        return fn(this, a);
    }
}

Number.prototype.add = methodize(addf);
(3).add(5);

/* Write demethodize, a function that converts a method to binary function.
 *   Ex:  demethodize(Number.prototype.add)(5, 7);      // 112
 */

function demethodize(fn) {
    return function (a, b) {
        return fn.call(a, b);
    }
}
demethodize(Number.prototype.add)(5, 7);

