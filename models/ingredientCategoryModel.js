// models/ingredientCategoryModel.js
const mongoose = require("mongoose");

const ingredientCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // slug: {
  //   type: String,
  //   unique: true,
  //   trim: true,
  // },
  // image: {
  //   type: String,
  //   trim: true,
  // },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "IngredientCategory",
    // default: null, // Set default value to null
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
});

const IngredientCategory = mongoose.model(
  "IngredientCategory",
  ingredientCategorySchema
);

module.exports = IngredientCategory;

// const mongoose = require("mongoose");

// const subcategorySchema = new mongoose.Schema({
//   subcategoryName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   ingredients: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Ingredient",
//     },
//   ],
// });

// const ingredientCategorySchema = new mongoose.Schema({
//   categoryName: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },

//   subcategories: [subcategorySchema], // Array of subcategories
// });

// const IngredientCategory = mongoose.model(
//   "IngredientCategory",
//   ingredientCategorySchema
// );

// module.exports = IngredientCategory;

// const mongoose = require("mongoose");

// const ingredientCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   slug: {
//     type: String,
//     unique: true,
//     trim: true,
//   },
//   imageUrl: {
//     type: String,
//     trim: true,
//   },
//   ingredients: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Ingredient",
//     },
//   ],
// });

// const IngredientCategory = mongoose.model(
//   "IngredientCategory",
//   ingredientCategorySchema
// );

// module.exports = IngredientCategory;
