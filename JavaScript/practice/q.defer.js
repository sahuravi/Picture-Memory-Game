let q = require('q');
let fs = require('fs');


function myReadFile(filePath) {
    let deffered = q.defer();

    fs.readFile(filePath, (error, data) => {
        if (error) {
            deffered.reject(error);
        } else {
            deffered.resolve(data);
        }
    });
    return deffered.promise;
}

function myReadFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

myReadFile('/ab.txt')
    .then((fileData) => {
        console.log(fileData);
    })
    .catch((error) => {
        console.log(error.message);
    });


function delay(message) {
    let deffered = q.defer();
    setTimeout(function() {
        deffered.resolve(`${message} Mr. Ravi Sahu`);
    }, 2000);

    return deffered.promise;
}