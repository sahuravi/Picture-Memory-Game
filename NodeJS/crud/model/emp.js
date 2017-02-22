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
        this.find({}, callback);
    },
    getById: function(id, callback) {
        this.findById(id, callback);
    },
    updateById: function(condition, updateData, callback) {
        this.update(condition, {$set: updateData}, callback);
    },
    removeById: function(condition, callback) {
         this.remove(condition, callback);
    },
    create: function(data, callback) {
        var user = new this(data);
        user.save(callback);
    }
};

//mongoose.model('modelName', schema);
let emp = mongoose.model('emp', empSchema);

module.exports = {
    emp
};
