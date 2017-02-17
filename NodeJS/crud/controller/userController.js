const Emp = require("../model/emp").emp;

exports.create = function (req, res) {
    debugger;
    let user = {
         name: req.body.username,
         organization: req.body.organization
    };

    Emp.create(user, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err);
        }
    });
};

/** getEmp function to get Emp by id. */
exports.get = function (req, res) {
    Emp.get({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err);
        }
    });
};

/** updateEmp function to get Emp by id. */
exports.update = function (req, res) {
    Emp.updateById(req.params.id, req.body, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(err); // 500 error
        }
    });
}

/** removeEmp function to get Emp by id. */
exports.delete = function (req, res) {
    Emp.removeById({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            console.log(err);
            return res.send(err); // 500 error
        }
    });
}