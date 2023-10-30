const Note = require('../model/Notes');
const mediaModel=require('../model/MediaModel');

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
    res.status(400).json({ error: error.message });
  }
};



// Retrieve all notes
exports.getAllNotes = (req, res) => {
  Note.find({})
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not get notes' });
    });
};

// Update a note by ID
exports.updateNote = (req, res) => {
  const { noteId } = req.params;
  Note.findByIdAndUpdate(noteId, { $set: req.body }, { new: true })
    .then((note) => {
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not update note' });
    });
};

// Delete a note by ID
exports.deleteNote = async(req, res) => {
  try {
    const deleteid =await Note.findById(req.params.id);
    await  mediaModel.findByIdAndUpdate(deleteid.courseId,{$pull:{notes:req.params.id}})
    await Note.findByIdAndRemove(req.params.id);
    res.status(201).json({message: 'Notes deleted successfully'});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};