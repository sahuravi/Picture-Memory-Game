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
