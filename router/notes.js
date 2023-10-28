const express = require('express');
const router = express.Router();
const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require('../controllers/notesController');

// Create a new note
router.post('/', createNote);

// Retrieve all notes
router.get('/', getAllNotes);

// Update a note by ID
router.put('/:noteId', updateNote);

// Delete a note by ID
router.delete('/:noteId', deleteNote);

module.exports = router;
