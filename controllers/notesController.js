const Note = require("../model/Notes");
const mediaModel = require("../model/MediaModel");

// Create a new note

exports.createNote = async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedata = await note.save();
    const mediaupdate = await mediaModel.findByIdAndUpdate(
      req.body.courseId,
      { $push: { notes: savedata._id } },
      { new: true }
    );
    await mediaupdate.save();
    res.status(201).json(savedata); // Change 'quiz' to 'savedata'
  } catch (error) {
    console.error("Error creating note:", error);
    res
      .status(400)
      .json({
        error: "Failed to create note. Please check your data and try again.",
      });
  }
};

// Retrieve all notes
exports.getAllNotes = (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not get notes" });
    });
};

// Update a note by ID
exports.updateNote = async (req, res) => {
  try {
    const notes = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note by ID
exports.deleteNote = async (req, res) => {
  try {
    const deleteid = await Note.findById(req.params.id);
    await mediaModel.findByIdAndUpdate(deleteid.courseId, {
      $pull: { notes: req.params.id },
    });
    await Note.findByIdAndRemove(req.params.id);
    res.status(201).json({ message: "Notes deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
