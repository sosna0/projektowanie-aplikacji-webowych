var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController.js');


router.get('/', function(req, res, next) {
    res.render('login-user');
});

router.post('/login', authController.loginUser);

module.exports = router;
