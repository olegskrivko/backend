// models/ingredientPriceModel.js
const mongoose = require("mongoose");

const ingredientPriceSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Add other fields related to pricing as needed
});

const IngredientPrice = mongoose.model(
  "IngredientPrice",
  ingredientPriceSchema
);

module.exports = IngredientPrice;
// NOT DONE
