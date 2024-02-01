// middleware/validations/ingredientCategoryValidation.js
const { body } = require("express-validator");
const IngredientCategory = require("../../models/ingredientCategoryModel");

const validateCreateIngredientCategory = [
  // body("name")
  //   .notEmpty()
  //   .withMessage("Ingredient category name is required")
  //   .trim()
  //   .isLength({ max: 50 })
  //   .withMessage("Ingredient category name must be less than 50 characters")
  //   .custom(async (value, { req }) => {
  //     // Skip further checks if the title is empty or null
  //     if (!value) {
  //       return true;
  //     }
  //     // Perform the pattern and database checks together
  //     const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
  //     const existingIngredientCategory = await IngredientCategory.findOne({
  //       name: value,
  //     });
  //     if (!patternMatch) {
  //       throw new Error(
  //         "Ingredient category name can only contain letters, spaces and hyphens"
  //       );
  //     }
  //     if (existingIngredientCategory) {
  //       throw new Error("Ingredient category name already exists");
  //     }
  //     return true;
  //   }),
  // body("description")
  //   .notEmpty()
  //   .withMessage("Ingredient category description is required")
  //   .trim()
  //   .isLength({ max: 250 })
  //   .withMessage(
  //     "Ingredient category description must be less than 250 characters"
  //   ),
];

const validateUpdateIngredientCategory = [
  body("name")
    .notEmpty()
    .withMessage("Ingredient category name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Ingredient category name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Ingredient category name is required");
      }
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingIngredientCategory = await IngredientCategory.findOne({
        name: value,
      });
      if (!patternMatch) {
        throw new Error(
          "Ingredient category name can only contain letters, spaces and hyphens"
        );
      }
      // Check if the ingredient category with the same name has a different ID
      if (
        existingIngredientCategory &&
        existingIngredientCategory._id.toString() !== req.params.id
      ) {
        throw new Error("Ingredient category name already exists");
      }
      return true;
    }),
  body("description")
    .notEmpty()
    .withMessage("Ingredient category description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage(
      "Ingredient category description must be less than 250 characters"
    ),
];

module.exports = {
  validateCreateIngredientCategory,
  validateUpdateIngredientCategory,
};
