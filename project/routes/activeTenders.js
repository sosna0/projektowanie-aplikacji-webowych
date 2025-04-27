var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');
const isAuthenticated = require('../middleware/auth.js');


// GET active tenders
router.get('/', tenderController.getActiveTenders);

router.get('/:tenderId', isAuthenticated, tenderController.getTenderById);


module.exports = router;
