const VideoProgress = require('../model/VideoProgress');

// Controller to save video progress
exports.saveVideoProgress = async (req, res) => {
  try {
    const { userId, videoUrl, progress } = req.body;
    const existingProgress = await VideoProgress.findOne({ userId, videoUrl });

    if (existingProgress) {
      existingProgress.progress = progress;
      await existingProgress.save();
    } else {
      await VideoProgress.create({ userId, videoUrl, progress });
    }

    res.status(200).json({ message: 'Progress saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving progress' });
  }
};

// Controller to retrieve video progress
exports.getVideoProgress = async (req, res) => {
  try {
    const { userId, videoUrl } = req.query;
    const progressData = await VideoProgress.findOne({ userId, videoUrl });

    if (progressData) {
      res.status(200).json({ progress: progressData.progress });
    } else {
      res.status(404).json({ message: 'Progress data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving progress' });
  }
};
