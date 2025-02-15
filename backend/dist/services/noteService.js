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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteService = exports.updateNoteService = exports.getNoteByIdService = exports.getNotesService = exports.createNoteService = void 0;
const Note_1 = __importDefault(require("../models/Note"));
const customError_1 = require("../utils/customError");
// Create a new note
const createNoteService = (title, content, user_id, category_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Note_1.default.create({ title, content, user_id, category_id });
});
exports.createNoteService = createNoteService;
// Get all notes for a user, optionally filtered by category_id
const getNotesService = (user_id, category_id) => __awaiter(void 0, void 0, void 0, function* () {
    const filterOptions = { where: { user_id } };
    if (category_id) {
        filterOptions.where.category_id = category_id;
    }
    const notes = yield Note_1.default.findAll(filterOptions);
    if (notes.length === 0) {
        throw new customError_1.CustomError('No notes found for this user', 404);
    }
    return notes;
});
exports.getNotesService = getNotesService;
// Get a single note by user_id and note_id
const getNoteByIdService = (user_id, note_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Note_1.default.findOne({ where: { user_id, id: note_id } });
});
exports.getNoteByIdService = getNoteByIdService;
// Update a note for the user
const updateNoteService = (user_id, note_id, title, content, category_id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield Note_1.default.findOne({ where: { user_id, id: note_id } });
    if (!note)
        throw new customError_1.CustomError('Note not found', 404);
    if (title)
        note.title = title;
    if (content)
        note.content = content;
    if (category_id)
        note.category_id = category_id;
    yield note.save();
    return note;
});
exports.updateNoteService = updateNoteService;
// Delete a note for the user
const deleteNoteService = (user_id, note_id) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield Note_1.default.findOne({ where: { user_id, id: note_id } });
    if (!note)
        return null;
    yield note.destroy();
    return true;
});
exports.deleteNoteService = deleteNoteService;
