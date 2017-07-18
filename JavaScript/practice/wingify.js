/*Write a function called ‘sumAll', that takes an array of numbers as a parameter and returns the sum of all the numbers in the array. The array could contain a nested array of numbers and the function should sum up the numbers anywhere in the nest of arrays. If the arrays contain anything other than a number, that element in that array should be ignored and the function should not throw an error.

Example:
sumAll([1, 2, [3, -6]]) // 0
sumAll([1, 2, [3, [4, 5, 6, [7, ‘hello’, ‘world', 8, 9, [[10]]]) // 55
*/

function sumAll(arr) {
    let sum = 0;
    arr.forEach((element) => {
        if(typeof element === 'number') {
            sum += element;
        } else if(Array.isArray(element)) {
            sum += sumAll(element);
        }
    });
    return sum;
}


/*Question 2
Write a function called ’shiftBase’, that takes two numbers as parameters: the number (in decimal) to shift, and the base of the new number system, which may range from 1 to 64, and returns the string representation of the number in the new number system. In a base 64 number system, the numbers may be represented in the following way:
0 - 9 = Numbers
10 - 35 = Lowercase alphabets (a-z)
36 - 61 = Uppercase alphabets (A-Z)
62 = Underscore (_)
63 = Hyphen(-)

Example:
shiftBase(15, 16) // f
shiftBase(16, 16) // 10
shiftBase(255, 16) // ff
shiftBase(63, 64) // -
shiftBase(4095, 64) // --
shiftBase(35, 36) // z
shiftBase(36, 36) // 10
shiftBase(8, 8) // 10
shiftBase(63, 8) // 77
*/

let map = {
    0:0,
    1:1,
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10: 'a',
    11: 'b',
    12: 'c',
    13: 'd',
    14: 'e',
    15: 'f',
    16: 'g',
    17: 'h',
    18: 'i',
    19: 'j',
    20: 'k',
    21: 'l',
    22: 'm',
    23: 'n',
    24: 'o',
    25: 'p',
    26: 'q',
    27: 'r',
    28: 's',
    29: 't',
    30: 'u',
    31: 'v',
    32: 'w',
    33: 'x',
    34: 'y',
    35: 'z',
    36: 'A',
    37: 'B',
    38: 'C',
    39: 'D',
    40: 'E',
    41: 'F',
    42: 'G',
    43: 'H',
    44: 'I',
    45: 'J',
    46: 'K',
    47: 'L',
    48: 'M',
    49: 'N',
    50: 'O',
    51: 'P',
    52: 'Q',
    53: 'R',
    54: 'S',
    55: 'T',
    56: 'U',
    57: 'V',
    58: 'W',
    59: 'X',
    60: 'Y',
    61: 'Z',
    62: '_',
    63: '-'
}

function shiftBase(number, base) {
    let arr = [];
    
    while(number >= base) {
        let remainder = number % base;
        number = parseInt(number / base);/*because converting into integer value*/
        arr.unshift(map[remainder]);
    }
    arr.unshift(map[number]);
    return arr.join("");
}

function changeBase(number, base) {
    let arr = [];
    while (number >= base) {
        let remainder = number % base;
        number = parseInt(number / base);
        arr.unshift(getCharecter(remainder));
    }

    function getCharecter (remainder) {
        if (remainder < 10 ) {
            return remainder;
        } else if ( remainder >= 10 && remainder <= 35 ) {
            return String.fromCharCode(remainder + 87);
        } else if ( remainder >= 36 && remainder <= 61 ) {
            return String.fromCharCode(remainder + 29);
        } else if ( remainder === 62) {
            return "_";
        } else if ( remainder === 63) {
            return "-";
        }
    }
    arr.unshift(getCharecter(number));
    console.log(arr.join(""));
}

/*
Question 3
Write a function called 'getScript' that fetches and executes a JavaScript file in the browser. The URL of the file to fetch is passed to it.

Base structure:

function getScript (url) {
 // should fetch the JavaScript file at the given URL and execute it.
}

Example call: 

getScript('http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.js');

Note: You are not supposed to use any external library.
*/

function getScript (url) {
    let scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
}

/*
Question 4
Write a function called 'sum' that should be usable as follows:

sum(1, 2, 3) // should return 6
sum(1)(2)(3) // should return 6
sum(1, 2)(3) // should 6

Note, the function can have any number of arguments, not just 3.
*/

function sum() {
    let args = Array.prototype.slice.call(arguments, 0);
    
    let myFun = function() {
        let args1 = Array.prototype.slice.call(arguments, 0);
        args = args.concat(args1);
        return myFun;
    }
    
    myFun.toString = function() {
        let argumentsSum = args.reduce((accumulator, nextValue) => {
            return accumulator + nextValue;
        });
        console.log(argumentsSum);
    }
    
    return myFun;
}


/*
Question 5
Write an implementation for a function 'callAfter' that enables any function to be called after some specified duration with certain parameters, with the following mentioned syntax:

Example: Lets say you have a function called 'sum' like so:

function sum(a, b) {
 console.log('Sum is: ', a + b);
}

Now you should be able to execute: 
sum.callAfter(5000, 8, 9);

which should invoke the function 'sum' after 5 seconds with parameters 8 and 9.
calee function
*/

Function.prototype.callAfter = function() {
    let delay = arguments[0];
    let args = Array.prototype.slice.call(arguments, 1);
    
    setTimeout(() => {
        this.apply(this, args);//this is going to call the caller func here 'sum'
    }, delay);
}

/*caller function*/

function sum(a, b) {
    console.log('Sum is: ', a + b);
}

/*test case*/

sum.callAfter(5000, 8, 9);