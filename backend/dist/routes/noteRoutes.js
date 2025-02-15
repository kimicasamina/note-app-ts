"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteController_1 = require("../controllers/noteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authenticate, noteController_1.createNote); // Create a note
router.get('/', authMiddleware_1.authenticate, noteController_1.getNotes); // Get all notes, filtered by category_id (optional)
router.get('/:id', authMiddleware_1.authenticate, noteController_1.getNoteById); // Get a single note by ID
router.put('/:id', authMiddleware_1.authenticate, noteController_1.updateNote); // Update a note by ID
router.delete('/:id', authMiddleware_1.authenticate, noteController_1.deleteNote); // Delete a note by ID
exports.default = router;
