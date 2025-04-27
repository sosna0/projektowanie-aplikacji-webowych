var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');


router.get('/', tenderController.getClosedTenders);

router.get('/:tenderId', tenderController.getTenderById);

module.exports = router;