var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');
const isAuthenticated = require('../middleware/auth.js');

router.get('/', isAuthenticated, function(req, res, next) {
    res.render('create-tender');
});

router.get('/save-tender', tenderController.createTender);


module.exports = router;