/**
 *  For given string 10001110110001 find the pair of 1's
 */

function getPairs(str, k) {
    let count = 0;
    let pairCount = 0;
    let previous = null;

    for (var i = 0; i < str.length - k + 1; i++) {
        //debugger
        previous = str[i];
        if (str[i] == 1) {
            if (pairCount < k) {
                pairCount++;
                if (pairCount == k) {
                    count++;
                }
            } else if (pairCount == k && str[i - 1] == 1) {
                count++;
            } else if (pairCount == k) {
                count++;
            }
        } else {
            if (pairCount == k) {
                count++;
            }
            pairCount = 0;
            previous = str[i];
        }
    }
    return count;
}