const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClothingItem'
  }],
  name: {
    type: String,
    required: true
  },
  occasion: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
