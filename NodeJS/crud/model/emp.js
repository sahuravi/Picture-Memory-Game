const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    name: "string",
    organization: "string"
});

empSchema.statics = {
    get: function(query, callback) {
        this.findOne(query, callback);
    },
    getAll: function(query, callback) {
        this.find(query, callback);
    },
    updateById: function(id, updateData, callback) {
        this.update(id, {$set: updateData}, callback);
    },
    remove: function(removeData, callback) {
         this.remove(removeData, callback);
    },
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    }
};

let employee = mongoose.model('emp', empSchema);

module.exports = {
    emp: employee
};
