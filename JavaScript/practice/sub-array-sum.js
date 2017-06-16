function largestSubArray(arr) {

    let len = arr.length;
    let results = [];

    for (let i = 0; i < len / 2; i++) {
        debugger;
        for (let j = i + 1; j < len / 2; j++) {
            debugger;
            let leftStart = i;
            let leftCounter = j + 1;
            let rightStart = leftCounter;
            let rightCounter = 2 * leftCounter - leftStart;
            let leftSum = 0;
            let rightSum = 0;

            for (let k = leftStart; k < leftCounter; k++) {
                leftSum += arr[k];
            }

            for (let k = rightStart; k < rightCounter; k++) {
                rightSum += arr[k];
            }
            if (leftSum === rightSum) {
                let temp = arr.slice(leftStart, rightCounter);
                results.push(temp);
            }
        }
    }
    console.log(results);
}

let arr = [3, 2, 7, 1, 8, 3];
largestSubArray(arr);

function getOddOccurrence(ar, ar_size) {
    let i;
    let res = 0;
    for (i = 0; i < ar_size; i++) {
        res = res ^ ar[i];
    }
    return res;
}

let ar = [2, 3, 5, 4, 5, 2, 4, 3, 5, 2, 4, 4, 2];
let n = ar.length;
console.log(occur.getOddOccurrence(ar, n));