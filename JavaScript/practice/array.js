/**
 * Question 1: Find the maximum sum of an array such that no adjacent elements are included.
 * Exp: [1,2,33,4,7,9]
 * max sum = 1+33+9
 */

function maxSumWithoutAdjacent(arr) {
    let sumExclude = 0;
    let sumInclude = arr[0];

    for (let i = 1; i < arr.length; i++) {
        let tempSumInclude = sumExclude + arr[i];
        sumExclude = max(sumExclude, sumInclude);
        sumInclude = tempSumInclude;
    }
    return max(sumExclude, sumInclude);
}

function max(a, b) {
    if (a !== null && a !== undefined && b !== null && b !== undefined) {
        return a > b ? a : b;
    }
}

maxSumWithoutAdjacent([1, 2, 33, 4, 7, 9]);

/**
 * Question 2: Get the unique combinations of numbers from an array of unique numbers of all digits.
 * Exp: [1,2,3,4,5,6] all possible 3 digit unique numbers are
 * 123,124,125,135,134,135,136,145,146,156,234,235,236,245,246,256,345,346,356,456 total 20 combinations.
 */

function getUniqueCombinations(arr) {
    let results = [];
    for (let i = 0; i < arr.length - 2; i++) {
        for (let j = i + 1; j < arr.length - 1; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                let temp = [];
                temp.push(arr[i]);
                temp.push(arr[j]);
                temp.push(arr[k]);
                results.push(temp);
            }
        }
    }
    console.log(JSON.stringify(results));
}

var arr = [1, 2, 3, 4, 5, 6];
getUniqueCombinations(arr);