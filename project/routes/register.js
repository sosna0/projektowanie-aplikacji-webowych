var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');


router.get('/', function(req, res, next) {
    res.render('register-user');
});

router.post('/register', authController.registerUser);

module.exports = router;