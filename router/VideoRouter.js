const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');

// Create a new video
router.post('/create', videoController.createVideo);

// Retrieve all videos
router.get('/getall', videoController.getAllVideos);

// Retrieve a specific video by ID
router.get('/getone/:id', videoController.getVideoById);

// Update a video by ID
router.put('/update/:id', videoController.updateVideoById);

// Delete a video by ID
router.delete('/delete/:id', videoController.deleteVideoById);


module.exports = router;
