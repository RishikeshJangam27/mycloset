const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/tokenManagement'); // Assuming token verification middleware
const {
    createClothingItem,
    getClothingItemsByUser,
    updateClothingItem,
    deleteClothingItem
} = require('../controllers/clothingController');

// Route to create a new clothing item, protected by token verification
router.post('/clothing', verifyToken, createClothingItem);

// Route to get all clothing items for a user, protected by token verification
router.get('/clothing', verifyToken, getClothingItemsByUser);

// Route to update a specific clothing item, protected by token verification
router.put('/clothing/:id', verifyToken, updateClothingItem);

// Route to delete a specific clothing item, protected by token verification
router.delete('/clothing/:id', verifyToken, deleteClothingItem);

module.exports = router;
