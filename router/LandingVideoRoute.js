const express = require('express');
const router = express.Router();
const {uploadVideos , getAllVideos, updateVideos} = require('../controllers/LandingVideosController');
const upload = require('../middleware/multer')

router.post("/videos",uploadVideos)
router.get("/getvideos",getAllVideos)
router.put("/updatevideos/:id",upload.single('landing_videos'),updateVideos)

module.exports=router;