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
router.put('/:id', updateNote);

// Delete a note by ID
router.delete('/:id', deleteNote);

module.exports = router;
