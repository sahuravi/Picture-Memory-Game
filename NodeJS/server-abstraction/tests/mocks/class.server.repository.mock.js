/**
 * Created by rajnish on 5/12/2016.
 */

'use strict'

class clsClassMock {

    constructor () {
        //do nothing for now
    }

    find() {
        return Promise.resolve([
            {
                "classId": "df042b08-9bef-490e-b428-370adf3a6e7a",
                "productId": "3c166a08-f70e-4e9a-8563-237b38addcaa",
                "title": "Class 1",
                "productTitle": "JavaScript Superheros",
                "startDate": "2016-03-20",
                "endDate": "2016-05-25",
                "instructorId": "dbf7a95a-f0eb-11e5-b2bc-95eea172e3bb",
                "instructorName": "teacher1",
                "simulations": "5",
                "adaptiveEnabled": "No",
                "courseStatus": "Live",
                "imageUrl": "assets/images/courses/2.png"
            },
            {
                "classId": "590f1d1e-fef9-477b-8a98-1e605bf532ee",
                "productId": "fa10b382-f5a9-11e5-a552-4c72b9e6b122",
                "title": "Class 2",
                "productTitle": "Basics of Programming, Using Python",
                "startDate": "2016-03-07",
                "endDate": "2016-06-17",
                "instructorId": "dbf7a95a-f0eb-11e5-b2bc-95eea172e3bb",
                "instructorName": "teacher1",
                "adaptiveEnabled": "No",
                "courseStatus": "Work In Progress",
                "imageUrl": "assets/images/courses/1.png"
            }]);
    }

    findById(classId) {

        if (classId === 'df042b08-9bef-490e-b428-370adf3a6e7a')
            return Promise.resolve({
                "classId": "df042b08-9bef-490e-b428-370adf3a6e7a",
                "productId": "3c166a08-f70e-4e9a-8563-237b38addcaa",
                "title": "Class 1",
                "productTitle": "JavaScript Superheros",
                "startDate": "2016-03-20",
                "endDate": "2016-05-25",
                "instructorId": "dbf7a95a-f0eb-11e5-b2bc-95eea172e3bb",
                "instructorName": "teacher1",
                "simulations": "5",
                "adaptiveEnabled": "No",
                "courseStatus": "Live",
                "imageUrl": "assets/images/courses/2.png"
            });
        else
            return Promise.resolve(null);
    }
}

module.exports = clsClassMock;