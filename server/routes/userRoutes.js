import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/users - Get all users (Protected)
router.get('/', protect, getAllUsers);

// GET /api/users/:id - Get a user by ID (Protected)
router.get('/:id', protect, getUserById);

// PUT /api/users/:id - Update a user (Protected)
router.put('/:id', protect, updateUser);

// DELETE /api/users/:id - Delete a user (Protected)
router.delete('/:id', protect, deleteUser);

export default router;
