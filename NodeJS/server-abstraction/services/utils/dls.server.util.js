/**
 * Created by rajnish on 4/6/2016.
 */

exports.sortingBasedOnProperty=function(objects,propertyBased){

    objects.sort(function (a, b) {
        if (a[propertyBased] > b[propertyBased]) {
            return 1;
        }
        if (a[propertyBased] < b[propertyBased]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
};

exports.transformObjectToArray=function (property) {
    var genericArray = [];
    Object.keys(property).forEach(function (key, index) {
        genericArray.push({name: key, id: index})
    });
    return genericArray;
};
