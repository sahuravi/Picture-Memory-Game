var arr = [3, 30, 34, 5, 9];    // Outpu 9534330

arr.sort(function (a, b) {
    let x = "" + a + b;
    let y = "" + b + a;
    return parseInt(y) - parseInt(x);
});
console.log(arr);