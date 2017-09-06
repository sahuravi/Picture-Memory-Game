/**
 * Question 1: Word Ladder (Length of shortest chain to reach a target word)
 * Given a dictionary, and two words ‘start’ and ‘target’ (both of same length). Find length of the smallest chain from ‘start’ to ‘target’ if it exists, such that adjacent words in the chain only differ by one character and each word in the chain is a valid word i.e., it exists in the dictionary. It may be assumed that the ‘target’ word exists in dictionary and length of all dictionary words is same.
 * Exp: Input:  Dictionary = {POON, PLEE, SAME, POIE, PLEA, PLIE, POIN}
 * start = TOON
 * target = PLEA
 * Output: 7
 * Explanation: TOON - POON - POIN - POIE - PLIE - PLEE - PLEA
 */

var dictionary = ['POON', 'PLEE', 'SAME', 'POIE', 'PLEA', 'PLIE', 'POIN'];
var start = 'TOON';
var target = 'PLEA';

/* var dictionary = ['savi', 'sara', 'sari', 'sura'];
var start = 'ravi';
var target = 'sura'; */

var transformationString = '';

function getTransformationCount(start, target, dictionary) {
    transformationString = '';
    let count = getCount(start, target, dictionary);
    console.log(transformationString);
    return count;
}

function getCount(start, target, dictionary) {
    transformationString += `${start} -> `;
    debugger;
    if (dictionary.length > 0) {
        let dictionaryIndex = 0;

        for (let i = 0; i < dictionary.length; i++) {
            let count = 0;
            for (let j = 0; j < start.length; j++) {
                if (start[j] !== dictionary[i][j]) {
                    count++;
                }
            }
            if (count === 1) {
                dictionaryIndex = i;
                break;
            }
        }

        start = dictionary.splice(dictionaryIndex, 1)[0];
        if (start === target) {
            transformationString += `${target}`;
            return 2;
        }
        return 1 + getCount(start, target, dictionary);
    } else {
        return `${start} cann't be converted to ${target} by single trnasformation using dictionary: ${dictionary}`;
    }
}