//var counter = 0;
function power(a, b) {
	//counter++;
	//console.log(counter);
	if (b === 0) {
		//counter = 0;
		return 1;
	} else {
		if (b % 2 === 0) {
			let result = power(a, b / 2);
			result *= result;
			//counter = 0;
			return result;
		} else {
			let result = power(a, parseInt(b / 2));
			result *= result;
			result *= a;
			//counter = 0;
			return result;
		}
	}
}