Array.prototype.myMap = function (callback, thisArgs) {
    var arr = [];
    for (var i in this) {
        if (this.hasOwnProperty(i)) {
            arr[i] = callback.call(thisArgs, this[i], i, this);
        }
    }
    return arr;
}

var arr = [1, 2, 3];
arr.myMap(function (a) {
    console.log(a);
});
