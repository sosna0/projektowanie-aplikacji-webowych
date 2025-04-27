var express = require('express');
var router = express.Router();
var bidController = require('../controllers/bidController.js');
const isAuthenticated = require('../middleware/auth.js');

router.get('/:tenderId', isAuthenticated, function(req, res, next) {
    res.render('create-bid', { tenderId: req.params.tenderId });
});

// router.get('/:tenderId', isAuthenticated, tenderController.getTenderById);

router.post('/:tenderId/save', bidController.createBid);

module.exports = router;