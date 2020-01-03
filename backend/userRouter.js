let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let user = require('./usersModel');

router.route('/create').post((req, res, next) => {
    user.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

module.exports = router;