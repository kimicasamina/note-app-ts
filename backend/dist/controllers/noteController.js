"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNoteById = exports.getNotes = exports.createNote = void 0;
const noteService_1 = require("../services/noteService");
const customError_1 = require("../utils/customError");
// Create a new note
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const { title, content, category_id } = req.body;
        const newNote = yield (0, noteService_1.createNoteService)(title, content, user_id, category_id);
        res.status(201).json({ newNote, message: 'Note created successfully.' });
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
// Get notes for the current user, optionally filtered by category_id
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id; // Get current user from req.user
        const { category_id } = req.query; // Get category_id from query parameters
        // Fetch notes filtered by user_id and optionally category_id
        const notes = yield (0, noteService_1.getNotesService)(user_id, category_id);
        res.status(200).json({ notes, message: 'Notes retrieved successfully.' });
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
// Get a note by ID for the current user
const getNoteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const note_id = req.params.id;
        const note = yield (0, noteService_1.getNoteByIdService)(user_id, note_id);
        if (!note) {
            throw new customError_1.CustomError('Note not found', 404);
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNoteById = getNoteById;
// Update a note by ID for the current user
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const note_id = req.params.id;
        const { title, content, category_id } = req.body;
        const updatedNote = yield (0, noteService_1.updateNoteService)(user_id, note_id, title, content, category_id);
        if (!updatedNote) {
            throw new customError_1.CustomError('Note not found', 404);
        }
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
// Delete a note by ID for the current user
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const note_id = req.params.id;
        const result = yield (0, noteService_1.deleteNoteService)(user_id, note_id);
        if (!result) {
            throw new customError_1.CustomError('Note not found', 404);
        }
        res.status(200).send({ message: 'Note successfully deleted.' });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
