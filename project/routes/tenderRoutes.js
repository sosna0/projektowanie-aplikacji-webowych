var express = require('express');
var router = express.Router();
import * as tenderController from '../controllers/tenderController.js';


// GET active tenders
router.get('/active-tenders', tenderController.getActiveTenders);

// GET closed tenders
router.get('/closed-tenders', tenderController.getClosedTenders);

// POST create tender
router.post('/', tenderController.createTender);

// GET tender by ID
router.get('/:id', tenderController.getTenderById);

// PUT update tender by ID
router.put('/:id', tenderController.updateTenderById);

// DELETE tender by ID
router.delete('/:id', tenderController.deleteTenderById);



