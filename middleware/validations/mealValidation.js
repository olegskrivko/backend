// middleware/validations/mealValidation.js
const { body } = require("express-validator");
const Meal = require("../../models/mealModel");

const validateCreateMeal = [
  body("name")
    .notEmpty()
    .withMessage("Meal name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Meal name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingMeal = await Meal.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Meal name can only contain letters, spaces and hyphens"
        );
      }

      if (existingMeal) {
        throw new Error("Meal name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Meal description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Meal description must be less than 250 characters"),
];

const validateUpdateMeal = [
  body("name")
    .notEmpty()
    .withMessage("Meal name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Meal name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Meal name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingMeal = await Meal.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Meal name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the meal with the same name has a different ID
      if (existingMeal && existingMeal._id.toString() !== req.params.id) {
        throw new Error("Meal name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Meal description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Meal description must be less than 250 characters"),
];

module.exports = {
  validateCreateMeal,
  validateUpdateMeal,
};
