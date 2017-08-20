function getLongestCommonSubstring(str1, str2) {
    let longestString = "";
    let matchArray = [];

    for (let row = 0; row <= str1.length; row++) {
        let rowArr = [];
        for (let col = 0; col <= str2.length; col++) {
            if (row == 0 && col === 0) {
                rowArr[col] = 0;
            } else if (row === 0) {
                rowArr[col] = str2[col - 1];
            } else if (col === 0) {
                rowArr[col] = str1[row - 1];
            } else {
                rowArr[col] = 0;
            }
        }
        matchArray.push(rowArr);
    }


    for (let row = 0; row < str1.length; row++) {
        for (let col = 0; col < str2.length; col++) {
            if (str1[row] === str2[col]) {
                matchArray[row + 1][col + 1] = 1;
            } else {
                matchArray[row + 1][col + 1] = 0;
            }
        }
    }

    for (let row = 0; row < str1.length; row++) {
        for (let col = 0; col < str2.length; col++) {
            if (matchArray[row + 1][col + 1] === 1) {
                debugger
                let str = getMatchedString(matchArray, row + 1, col + 1);
                if (longestString.length < str.length) {
                    longestString = str;
                }
            }
        }
    }
    return longestString;
}

function getMatchedString(arr, r, c) {
    // First check the boundary conditions
    if (r < 0 || c < 0 || r >= arr.length || c >= arr[r].length) {
        return "";
    }

    if (arr[r][c] === 0) {
        return "";
    }

    if (arr[r][c] === 1) {
        arr[r][c] = 0;
        return arr[r][0] + getMatchedString(arr, r + 1, c + 1);
    } else {
        return "";
    }
}

var s1 = 'hellodear.howryou';
var s2 = 'iamfinedear.';
getLongestCommonSubstring(s1, s2);

/* 
[
    [0, i, a, m, f, i, n, e, d, e, a, r, .],
    [h, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [e, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [l, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [d, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [e, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [a, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [., 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [h, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [w, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [o, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [u, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
] 

*/