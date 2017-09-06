CSS - 7
HTML - 7
JS - 8

//================================================================================================

function someFun() {
    console.log(i); // undefined
    var i = 5;
    for (var i = 0; i < 10; i++) {
        setTimeout(function() {
            console.log(i++); // 10,11,12,13,...
        }, 0);
    }
}
someFun();

//================================================================================================
function Human(gender, name, age) {
    this.gender = gender;
    this.name = name;
    this.age = age;

    return {
        someRandomeKey: 'someRandomValue'
    };
}

var human1 = new Human("male", "Ravi", "26");
console.log(human1);

//================================================================================================
// There is infinite stream of prime numbers, You need to print list of unique prime numbers at any point in time

let uniqueNos = {};

//================================================================================================

var ABC = function() {
    // some declarations 
    // Apporach 1
    this.someFunction1 = function() {
        // function definition
    }
};

// approach 2
ABC.someFunction1 = function() {
    // function definition
    console.log("static");
};

// appraoch 3
ABC.prototype = {
    someFunction1: function() {
        // function definition
    }
};

var abc = new ABC();
abc.someFunction1();