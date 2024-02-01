// models/dietModel.js
const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
