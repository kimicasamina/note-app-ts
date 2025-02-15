"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Route to create a new user
router.post('/', authMiddleware_1.authenticate, userController_1.createUser);
// Route to get all users
router.get('/', authMiddleware_1.authenticate, userController_1.getUsers);
// Route to get a single user by ID
router.get('/:id', authMiddleware_1.authenticate, userController_1.getUserById);
// Route to update a user by ID
router.put('/:id', authMiddleware_1.authenticate, userController_1.updateUser);
// Route to delete a user by ID
router.delete('/:id', authMiddleware_1.authenticate, userController_1.deleteUser);
exports.default = router;
