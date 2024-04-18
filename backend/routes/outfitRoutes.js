const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/tokenManagement'); // Assuming token verification middleware
const {
    createOutfit,
    getOutfitsByUser,
    updateOutfit,
    deleteOutfit
} = require('../controllers/outfitController');

// Route to create a new outfit, protected by token verification
router.post('/outfits', verifyToken, createOutfit);

// Route to get all outfits for a user, protected by token verification
router.get('/outfits', verifyToken, getOutfitsByUser);

// Route to update a specific outfit, protected by token verification
router.put('/outfits/:id', verifyToken, updateOutfit);

// Route to delete a specific outfit, protected by token verification
router.delete('/outfits/:id', verifyToken, deleteOutfit);

module.exports = router;
