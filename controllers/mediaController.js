// mediaController.js

const Media = require('../model/MediaModel');
const fs = require('fs');
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
  cloud_name: 'df1qnqmit',
  api_key: '944177449749656',
  api_secret: '8N1gnuaZd0dChIEz6klOeNZopD4',
});

exports.create = async (req, res) => {
  const { courseName, courseDescription } = req.body;
  let videosUrls = [];
  let imageUrl = '';

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      const result = await cloudinary.uploader.upload(video.path, {
        folder: 'Videos',
        resource_type: 'video',
        use_filename: true,
        overwrite: true,
      });
      videosUrls.push(result.secure_url);
      fs.unlinkSync(video.path);
    }
  }

  if (req.files && req.files.image && req.files.image.length > 0) {
    const result = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: 'Images',
      overwrite: true,
    });
    imageUrl = result.secure_url;
    fs.unlinkSync(req.files.image[0].path);
  }

  try {
    const createMedia = await Media.create({
      courseName,
      courseDescription,
      image: imageUrl,
      videos: videosUrls,
    });

    res.json({ message: 'Media created successfully', createMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create media' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get media' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const media = await Media.findById(id).populate('quiz');
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get media' });
  }
};

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
    res.status(500).json({ error: 'Failed to update media' });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const media = await Media.findByIdAndDelete(id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Delete videos and image associated with the media course from Cloudinary
    for (const video of media.videos) {
      // Delete video from Cloudinary
      const videoId = video.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`Videos/${videoId}`);
    }

    if (media.image) {
      // Delete image from Cloudinary
      const imageId = media.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`Images/${imageId}`);
    }

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
};
