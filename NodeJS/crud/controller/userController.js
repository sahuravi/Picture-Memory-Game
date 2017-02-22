const Emp = require("../model/emp").emp;

exports.create = (req, res) => {
    let user = {
         name: req.body.username,
         organization: req.body.organization
    };

    Emp.create(user, function(err, result) {
        if (!err) {
            // return res.json(result);
            res.redirect('/getAllUser');
        } else {
            return res.send(err);
        }
    });
};

/** getEmp function to get Emp by id. */
exports.getUser = (userid, res, callback) => {
    Emp.getById(userid, callback);
};

/** getEmp function to get Emp by id. */
exports.getById = (userid, res) => {
    Emp.getById(userid, function(err, user) {
        if (!err) {
            return res.json(user);
        } else {
            return res.send(err);
        }
    });
};

/** getEmp function to get Emp by id. */
exports.getAll = (req, res) => {
    Emp.getAll({}, function(err, result) {
        if (!err) {
            return res.render('users', {users: result});
        } else {
            return res.send(err);
        }
    });
};

/** updateEmp function to get Emp by id. */
exports.update = (req, res) => {
    let user = {};
    user.name = req.body.username;
    user.organization = req.body.company;
    console.log(req.body.userid);

    Emp.updateById({_id: req.body.userid}, user, function(err, result) {
        if (!err) {
            // return res.json(result);
            res.redirect('/getAllUser');
        } else {
            return res.send(err); // 500 error
        }
    });
}

/** removeEmp function to get Emp by id. */
exports.delete = (condition, res) => {
    Emp.removeById(condition, function(err, result) {
        if (!err) {
            // return res.json(result);
            res.redirect('/getAllUser');
        } else {
            console.log(err);
            return res.send(err); // 500 error
        }
    });
}