function checkForBrackets(input) {
    let arr = [];
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) === '{') {
            arr.push(input.charAt(i));
        } else if (input.charAt(i) === '}') {
            arr.pop();
        }
    }
    if (arr.length === 0) {
        console.log("Given string is fine");
    } else {
        console.log("Given string is wrong");
    }
}

var input = "{";
checkForBrackets(input);