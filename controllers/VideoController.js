// VideoController.js

const Video = require("../model/VideoModel");

// Create a new video
const createVideo = async (req, res) => {
  try {
    const { moduleId, moduleName, videoUrls, courseName } = req.body;
    const video = new Video({
      moduleId,
      moduleName,
      videoUrls,
      courseName, // Saving courseName from the request body
    });
    const savedVideo = await video.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retrieve a specific video by ID
const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video by ID
const updateVideoById = async (req, res) => {
  try {
    const { moduleId, moduleName, videoUrls } = req.body;
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        moduleId,
        moduleName,
        videoUrls,
      },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a video by ID
const deleteVideoById = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideoById,
  deleteVideoById,
};
