const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.post('/store', progressController.storeProgress);
router.get('/get/:userId', progressController.getProgress);

module.exports = router;
