// middleware/validations/tasteValidation.js
const { body } = require("express-validator");
const Taste = require("../../models/tasteModel");

const validateCreateTaste = [
  body("name")
    .notEmpty()
    .withMessage("Taste name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Taste name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingTaste = await Taste.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Taste name can only contain letters, spaces and hyphens"
        );
      }

      if (existingTaste) {
        throw new Error("Taste name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Taste description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Taste description must be less than 250 characters"),
];

const validateUpdateTaste = [
  body("name")
    .notEmpty()
    .withMessage("Taste name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Taste name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Taste name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingTaste = await Taste.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Taste name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the taste with the same name has a different ID
      if (existingTaste && existingTaste._id.toString() !== req.params.id) {
        throw new Error("Taste name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Taste description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Taste description must be less than 250 characters"),
];

module.exports = {
  validateCreateTaste,
  validateUpdateTaste,
};
