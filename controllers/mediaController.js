const Media=require('../model/MediaModel')
const fs = require('fs');


exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }

}

exports.create = async (req, res, next) => {
  const { name } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push('/' + video.path);
    }
  }
  try {
    const createMedia = await Media.create({
      name,
      videos: videosPaths
    });
    // Remove videos from public/videos folder after storing in the database
    if (req.files && req.files.videos) {
      for (const video of req.files.videos) {
        fs.unlinkSync(video.path);
      }
    }

    res.json({ message: 'Media created successfully', createMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};