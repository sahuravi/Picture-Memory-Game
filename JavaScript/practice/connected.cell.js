// var arr = [[0, 0, 1, 1, 0],
// [0, 1, 0, 1, 0],
// [0, 1, 0, 0, 1],
// [0, 0, 0, 0, 0]
// [1, 0, 1, 1, 0]];

var arr = [[1, 1, 0, 0, 0],
[0, 1, 0, 0, 1],
[1, 0, 0, 1, 1],
[0, 0, 0, 0, 0],
[1, 0, 1, 0, 1]];
getMaximumConnectedCells(arr);

function getMaximumConnectedCells(arr) {
    let maxConnected = 0;

    for (let row = 0; row < arr.length; row++) {
        for (let column = 0; column < arr[row].length; column++) {
            if (arr[row][column] === 1) {
                let size = getConnectedSize(arr, row, column);
                maxConnected = Math.max(size, maxConnected);
            }
        }
    }
    console.log(maxConnected);
}

function getConnectedSize(arr, row, column) {
    if (row < 0 || column < 0 || row >= arr.length || column >= arr[row].length) {
        return 0;
    }
    if (arr[row][column] === 0) {
        return 0;
    }
    arr[row][column] = 0;
    let size = 1;

    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = column - 1; c <= column + 1; c++) {
            if (r !== row && c !== column) {
                size = size + getConnectedSize(arr, r, c);
            }
        }
    }

    return size;
}