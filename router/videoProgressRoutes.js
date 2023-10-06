const express = require('express');
const router = express.Router();
const videoProgressController = require('../controllers/videoProgressController');

// Route to save video progress
router.post('/save', videoProgressController.saveVideoProgress);

// Route to retrieve video progress
router.get('/get', videoProgressController.getVideoProgress);

module.exports = router;
