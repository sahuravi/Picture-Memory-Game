function checkAnagrams(str1, str2) {
    if (str1.length !== str2.length) {
        return -1;
    } else {
        str1 = str1.split('').sort().join("");
        str2 = str2.split('').sort().join("");
        if (str1 === str2) {
            return 0;
        } else {
            let counter = 0;
            for (let i = 0; i < str1.length; i++) {
                if (str1.charAt(i) !== str2.charAt(i)) {
                    counter++;
                }
            }
            return counter;
        }
    }
}
// Strings which are passed must be only a-z or A-Z.
checkAnagrams("eat", "tea");
checkAnagrams("eats", "tea");
checkAnagrams("eadet", "teado");
checkAnagrams("eeatt", "temna");