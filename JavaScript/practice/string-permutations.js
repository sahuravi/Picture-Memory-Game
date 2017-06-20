
function swap(input, left, right) {
    if (left !== right) {
        temp = input[left];
        input[left] = input[right];
        input[right] = temp;
    }
    return input;
}

function Permutations(input, left, right) {
    if (left === right) {
        console.log(input.join(""));
    } else {
        for (let i = left; i <= right; i++) {
            input = swap(input, left, i);
            Permutations(input, left + 1, right);
            input = swap(input, left, i);
        }
    }
}
let input = "ABCD";
let len = input.length;
Permutations(input.split(""), 0, len - 1);

