// This function checks for input N to be prime or not.
function isPrime(N) {
    for (let i = 2; i * i <= N; i++) {
        if (N % i === 0) {
            return false;
        }
    }
    return true;
}

// This function takes an input N (a number) and prints all the prime numbers from 2 to N (that input number).
function printPrimes(start, N) {
    let result = [];
    let primes = [];
    let index = 2;
    while (index <= N) {
        primes[index] = true;
        index++;
    }

    for (let i = 2; i * i <= N; i++) {
        if (primes[i]) {
            for (let j = 2 * i; j <= N; j = j + i) {
                primes[j] = false;
            }
        }
    }

    for (let i = start; i <= N; i++) {
        if (primes[i]) {
            result.push(i);
        }
    }
    return result;
}

function getAllPrimes(arr) {debugger;
    let results = [];
    for (let index = 0; index < arr.length; index++) {
        if (index === 0) {
            results.push(printPrimes(2, arr[index]));
        } else {
            results.push(printPrimes(arr[index - 1] + 1, arr[index]));
        }
    }
    return results;
}
getAllPrimes([9, 17, 33, 84, 185]);