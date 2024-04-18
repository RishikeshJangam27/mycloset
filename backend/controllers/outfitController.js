const Outfit = require('../models/Outfit');

exports.createOutfit = async (req, res) => {
    try {
        const newOutfit = new Outfit({
            userId: req.user._id,  // Assuming userId comes from a verified JWT
            items: req.body.items,
            name: req.body.name,
            occasion: req.body.occasion,
            description: req.body.description
        });
        const savedOutfit = await newOutfit.save();
        res.status(201).json(savedOutfit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getOutfitsByUser = async (req, res) => {
    try {
        const outfits = await Outfit.find({ userId: req.user._id }).populate('items');
        res.json(outfits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOutfit = async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.id);
        if (!outfit) {
            return res.status(404).json({ message: "Outfit not found" });
        }
        if (outfit.userId.toString() !== req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        outfit.items = req.body.items || outfit.items;
        outfit.name = req.body.name || outfit.name;
        outfit.occasion = req.body.occasion || outfit.occasion;
        outfit.description = req.body.description || outfit.description;
        const updatedOutfit = await outfit.save();
        res.json(updatedOutfit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOutfit = async (req, res) => {
    try {
        const outfit = await Outfit.findById(req.params.id);
        if (!outfit) {
            return res.status(404).json({ message: "Outfit not found" });
        }
        if (outfit.userId.toString() !== req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await outfit.remove();
        res.json({ message: "Outfit deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
