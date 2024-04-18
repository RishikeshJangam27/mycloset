const ClothingItem = require('../models/ClothingItem');

exports.createClothingItem = async (req, res) => {
    try {
        const newItem = new ClothingItem({
            userId: req.user._id,  // Assuming userId comes from a verified JWT
            category: req.body.category,
            description: req.body.description,
            imagePath: req.body.imagePath
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClothingItemsByUser = async (req, res) => {
    try {
        const items = await ClothingItem.find({ userId: req.user._id });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClothingItem = async (req, res) => {
    try {
        const item = await ClothingItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.userId.toString() !== req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        item.category = req.body.category || item.category;
        item.description = req.body.description || item.description;
        item.imagePath = req.body.imagePath || item.imagePath;
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteClothingItem = async (req, res) => {
    try {
        const item = await ClothingItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.userId.toString() !== req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await item.remove();
        res.json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
