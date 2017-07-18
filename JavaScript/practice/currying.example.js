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

console.log(sum(2, 3, 4));

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

/* Write a function composeu that takes two unary funcitons and returns a unary function that calls them both.
 *   Ex:  composeu(double, square)(4);      // 64
 */

function composeu(fn1, fn2) {
    return function (arg) {
        return fn2(fn1(arg));
    }
}

composeu(double, square)(4); // before calling this line we need to define both function i.e double and square.


/* Write a function composeb that takes two binary funcitons and returns a function that calls them both.
 *   Ex:  composeu(addf, mult)(4, 5, 2);      // 18
 */

function composeu(fn1, fn2) {
    return function (a, b, c) {
        return fn2(fn1(a, b), c);
    }
}

composeu(double, square)(4);


/* Write a function that allows another function to only be called once.
 *   Ex:  add_once = once(add);      // 18
 *      add_once(2,3);      // 5
 *      add_once(4,7);      // throw error
 */

function once(fn) {
    return function () {
        let F = fn;
        fn = null;
        return F === null ? new Error("You cann't call this funciton twice") : F.apply(this, arguments);
    }
}

var add_once = once(addf);
add_once(8, 9);
add_once(8, 9);


/* Write a factory function that returns two functions that implement an Up/Down counter.
 *   Ex:  counter = counterf(10);
 *      counter.inc();      // 11
 *      counter.dec();      // 10
 */

function counterf(number) {
    return {
        inc: function () {
            return ++number;
        },
        dec: function () {
            return --number;
        }
    }
}

var counter = counterf(5);
counter.inc(); // 6
counter.dec(); // 5