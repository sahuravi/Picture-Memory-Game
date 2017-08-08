function checkHappy(number) {
    // if (number === 1) {
    //     return true;
    // } else if (number <= 9 && number > 1) {
    //     return number;
    // }
    var squareSum = 0;
    while (number > 9) {
        var remainder = number % 10;
        squareSum += remainder * remainder;
        number = parseInt(number / 10);
    }
    squareSum += number * number;

    if (squareSum === 1) {
        return true;
    } else if (squareSum > 1 && squareSum <= 9) {
        return squareSum;
    } else {
        return checkHappy(squareSum);
    }
}
