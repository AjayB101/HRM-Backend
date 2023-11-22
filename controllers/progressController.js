const Progress = require('../model/progressModel');

const storeProgress = async (req, res) => {
  try {
    const { videoUrl, userId, completed } = req.body;
    const progress = new Progress({ videoUrl, userId, completed });
    await progress.save();
    res.status(201).json(progress);
  } catch (error) {
    console.error('Error storing progress:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const progress = await Progress.find({ userId });

    // Create a dictionary to store completion status for each video URL
    const progressMap = {};
    progress.forEach(item => {
      progressMap[item.videoUrl] = item.completed;
    });

    res.status(200).json(progressMap);
  } catch (error) {
    console.error('Error retrieving progress:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { storeProgress, getProgress };
