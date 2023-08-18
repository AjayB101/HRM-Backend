const Media = require('../model/MediaModel');
const fs = require('fs');

// Create a new media course
exports.create = async (req, res, next) => {
  const { courseName, courseDescription } = req.body;
  let videosPaths = [];
  let imagePath = '';

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push('/' + video.path);
    }
  }

  if (req.files && req.files.image && req.files.image.length > 0) {
    imagePath = '/' + req.files.image[0].path;
  }

  try {
    const createMedia = await Media.create({
      courseName,
      courseDescription,
      image: imagePath,
      videos: videosPaths,
    });

    // Remove videos and image from public/videos and public/images folders after storing in the database
    if (req.files && req.files.videos) {
      for (const video of req.files.videos) {
        fs.unlinkSync(video.path);
      }
    }
    if (req.files && req.files.image && req.files.image.length > 0) {
      fs.unlinkSync(req.files.image[0].path);
    }

    res.json({ message: 'Media created successfully', createMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Get all media courses
exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Get a single media course by ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Update a media course by ID
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { courseName, courseDescription } = req.body;

  try {
    const media = await Media.findByIdAndUpdate(
      id,
      {
        courseName,
        courseDescription,
      },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json({ message: 'Media updated successfully', media });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// Delete a media course by ID
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const media = await Media.findByIdAndDelete(id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete videos and image associated with the media course from the filesystem
    for (const video of media.videos) {
      fs.unlinkSync(video.substring(1));
    }
    if (media.image) {
      fs.unlinkSync(media.image.substring(1));
    }

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
