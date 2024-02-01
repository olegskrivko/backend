// middleware/validations/cuisineValidation.js
const { body } = require("express-validator");
const Cuisine = require("../../models/cuisineModel");

const validateCreateCuisine = [
  body("name")
    .notEmpty()
    .withMessage("Cuisine name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Cuisine name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingCuisine = await Cuisine.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Cuisine name can only contain letters, spaces and hyphens"
        );
      }

      if (existingCuisine) {
        throw new Error("Cuisine name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Cuisine description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Cuisine description must be less than 250 characters"),
];

const validateUpdateCuisine = [
  body("name")
    .notEmpty()
    .withMessage("Cuisine name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Cuisine name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Cuisine name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingCuisine = await Cuisine.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Cuisine name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the cuisine with the same name has a different ID
      if (existingCuisine && existingCuisine._id.toString() !== req.params.id) {
        throw new Error("Cuisine name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Cuisine description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Cuisine description must be less than 250 characters"),
];

module.exports = {
  validateCreateCuisine,
  validateUpdateCuisine,
};
