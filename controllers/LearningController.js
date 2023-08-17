//learningcontroller

const LearningSystem = require("../model/LearningModel");
const fs = require("fs");
const path = require('path');

const createLearningEntry = async (req, res) => {
  const { courseName, courseDescription } = req.body;
  const { image, video } = req.files;
  const imageFile = image[0];
  const videoFile = video[0];

  try {
    const newLearningEntry = new LearningSystem({
      courseName,
      courseDescription,
      image: {
        data: fs.readFileSync(imageFile.path),
        contentType: imageFile.mimetype,
      },
      video: {
        data: fs.readFileSync(videoFile.path),
        contentType: videoFile.mimetype,
      }
    });
    console.log(`newlearn=${newLearningEntry}`);
    await newLearningEntry.save();

    // Cleanup files after successful save
    fs.unlinkSync(imageFile.path);
    fs.unlinkSync(videoFile.path);

    res.status(201).json({ message: "Learning entry created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
 

const getLearningEntries = async (req, res) => {
  try {
    const learningEntries = await LearningSystem.find();
    res.status(200).json(learningEntries);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLearningEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const learningEntry = await LearningSystem.findById(id);
    if (!learningEntry) {
      return res.status(404).json({ message: "Learning entry not found" });
    }
    res.status(200).json(learningEntry);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateLearningEntry = async (req, res) => {
  const { id } = req.params;
  const { courseName, courseDescription } = req.body;
  const { image, video } = req.files;
  const imageFile = image[0];
  const videoFile = video[0];

  try {
    const learningEntry = await LearningSystem.findById(id);
    if (!learningEntry) {
      return res.status(404).json({ message: "Learning entry not found" });
    }

    learningEntry.courseName = courseName;
    learningEntry.courseDescription = courseDescription;

    // Read image buffer and serialize
    const imageBuffer = fs.readFileSync(imageFile.path);
    learningEntry.image.data = Buffer.from(imageBuffer);
    learningEntry.image.contentType = imageFile.mimetype;

    // Read video buffer and serialize
    const videoBuffer = fs.readFileSync(videoFile.path);
    learningEntry.video.data = Buffer.from(videoBuffer);
    learningEntry.video.contentType = videoFile.mimetype;

    await learningEntry.save();

    fs.unlinkSync(imageFile.path);
    fs.unlinkSync(videoFile.path);

    res.status(200).json({ message: "Learning entry updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteLearningEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const learningEntry = await LearningSystem.findByIdAndDelete(id);
    if (!learningEntry) {
      return res.status(404).json({ message: "Learning entry not found" });
    }
    res.status(200).json({ message: "Learning entry deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createLearningEntry,
  getLearningEntries,
  getLearningEntryById,
  updateLearningEntry,
  deleteLearningEntry,
};
