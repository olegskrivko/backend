// middleware/validations/occasionValidation.js
const { body } = require("express-validator");
const Occasion = require("../../models/occasionModel");

const validateCreateOccasion = [
  body("name")
    .notEmpty()
    .withMessage("Occasion name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Occasion name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingOccasion = await Occasion.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Occasion name can only contain letters, spaces and hyphens"
        );
      }

      if (existingOccasion) {
        throw new Error("Occasion name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Occasion description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Occasion description must be less than 250 characters"),
];

const validateUpdateOccasion = [
  body("name")
    .notEmpty()
    .withMessage("Occasion name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Occasion name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Occasion name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingOccasion = await Occasion.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Occasion name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the occasion with the same name has a different ID
      if (
        existingOccasion &&
        existingOccasion._id.toString() !== req.params.id
      ) {
        throw new Error("Occasion name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Occasion description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Occasion description must be less than 250 characters"),
];

module.exports = {
  validateCreateOccasion,
  validateUpdateOccasion,
};
