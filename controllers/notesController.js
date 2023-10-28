const Note = require('../model/Notes');

// Create a new note
exports.createNote = (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({
    title,
    content,
  });
  newNote
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => {
      res.status(400).json({ error: 'Could not create note' });
    });
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
exports.deleteNote = (req, res) => {
  const { noteId } = req.params;
  Note.findByIdAndRemove(noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not delete note' });
    });
};