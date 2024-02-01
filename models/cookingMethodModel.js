const mongoose = require("mongoose");

const cookingMethodSchema = new mongoose.Schema({
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

const CookingMethod = mongoose.model("CookingMethod", cookingMethodSchema);

module.exports = CookingMethod;
