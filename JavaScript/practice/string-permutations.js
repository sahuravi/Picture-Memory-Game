swap("123", 0, 2);
function swap(input, left, right) {debugger;
    input = input.split("");
    l = input[left];
    r = input[right];
    input.splice(left, 1, r);
    input.splice(right, 1, l);
    return input.join("");
}

function Permutations(input, left, right) {
    if (left === right) {
        console.log(input);
    } else {
        for (i = left; i <= right; i++) {
            input = swap(input, left, i);
            Permutations(input, left + 1, right);
            input = swap(input, left, i);
        }
    }
}
let input = "7362";
let len = input.length;
Permutations(input, 0, len - 1);





const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

permutator(['1','2','3']);

function permut(string) {
    if (string.length < 2) return string; // This is our break condition

    var permutations = []; // This array will hold our permutations

    for (var i=0; i<string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue;           // skip it this time

        var remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

        for (var subPermutation of permut(remainingString))
            permutations.push(char + subPermutation)

    }
    return permutations;
}
permute("123");