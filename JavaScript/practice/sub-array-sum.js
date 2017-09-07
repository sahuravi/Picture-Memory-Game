function largestSubArray(arr) {

    let len = arr.length;
    let results = [];

    for (let i = 0; i < len / 2; i++) {
        for (let j = i + 1; j < len / 2; j++) {
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


// Correct solution

function largetsSubArr(arr){
 var largestsub = [];
 for(var i=0; i<n-1; i++){
     var left = i;
     var right = i+1;
     while(left>=0 && right<arr.length){
         var leftsum = null;
         for(var k=left; k<=i; k++){
             leftsum += arr[k];
         }

         var rightsum = null;
         for(var k=i+1; k<=right; k++){
             rightsum += arr[k];
         }

         if(leftsum === rightsum){
             if(largestsub.length > (rigth-left)){
                 largetsSubArr = arr.slice(left,right+1);
             }
         }
         left--;
         right++;
     }
 }   
 console.log(largestsub)
}

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
console.log(getOddOccurrence(ar, n));