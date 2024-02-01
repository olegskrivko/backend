// middleware/validations/ingredientValidation.js
const { body } = require("express-validator");
const Ingredient = require("../../models/ingredientModel");

const validateCreateIngredient = [
  //   body("name")
  //     .notEmpty()
  //     .withMessage("Cooking method name is required")
  //     .trim()
  //     .isLength({ max: 50 })
  //     .withMessage("Cooking method name must be less than 50 characters")
  //     .custom(async (value, { req }) => {
  //       // Skip further checks if the title is empty or null
  //       if (!value) {
  //         return true;
  //       }
  //       // Perform the pattern and database checks together
  //       const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
  //       const existingCookingMethod = await CookingMethod.findOne({
  //         name: value,
  //       });
  //       if (!patternMatch) {
  //         throw new Error(
  //           "Cooking method name can only contain letters, spaces and hyphens"
  //         );
  //       }
  //       if (existingCookingMethod) {
  //         throw new Error("Cooking method name already exists");
  //       }
  //       return true;
  //     }),
  //   body("description")
  //     .notEmpty()
  //     .withMessage("Cooking method description is required")
  //     .trim()
  //     .isLength({ max: 250 })
  //     .withMessage("Cooking method description must be less than 250 characters"),
];

const validateUpdateIngredient = [
  //   body("name")
  //     .notEmpty()
  //     .withMessage("Cooking method name cannot be empty")
  //     .trim()
  //     .isLength({ max: 50 })
  //     .withMessage("Cooking method name must be less than 50 characters")
  //     .custom(async (value, { req }) => {
  //       if (!value.trim()) {
  //         throw new Error("Cooking method name is required");
  //       }
  //       const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
  //       const existingCookingMethod = await CookingMethod.findOne({
  //         name: value,
  //       });
  //       if (!patternMatch) {
  //         throw new Error(
  //           "Cooking method name can only contain letters, spaces and hyphens"
  //         );
  //       }
  //       // Check if the cooking method with the same name has a different ID
  //       if (
  //         existingCookingMethod &&
  //         existingCookingMethod._id.toString() !== req.params.id
  //       ) {
  //         throw new Error("Cooking method name already exists");
  //       }
  //       return true;
  //     }),
  //   body("description")
  //     .notEmpty()
  //     .withMessage("Cooking method description cannot be empty")
  //     .trim()
  //     .isLength({ max: 250 })
  //     .withMessage("Cooking method description must be less than 250 characters"),
];

module.exports = {
  validateCreateIngredient,
  validateUpdateIngredient,
};
