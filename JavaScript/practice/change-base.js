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
changeBase(8, 2);

