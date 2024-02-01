// models/allergenModel.js
const mongoose = require("mongoose");

const allergenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

const Allergen = mongoose.model("Allergen", allergenSchema);

module.exports = Allergen;
