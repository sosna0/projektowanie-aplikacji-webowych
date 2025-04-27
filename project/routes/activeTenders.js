var express = require('express');
var router = express.Router();
var tenderController = require('../controllers/tenderController.js');

// GET active tenders - rendered as HTML
// router.get('/', (req, res, next) => {
//     console.log('>>> /active-tenders hit');
//     next();
//   }, tenderController.getActiveTenders);

// router.get('/', function(req, res, next) {
//     res.render('active-tenders');
// });

// GET active tenders
router.get('/', tenderController.getActiveTenders);

router.get('/:tenderId', tenderController.getTenderById);


// GET user tenders //TODO: do poprawy
// router.get('/:userId', tenderController.getAllUserTenders);
// router.get('/details', ...);


module.exports = router;
