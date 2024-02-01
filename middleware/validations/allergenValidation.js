// middleware/validations/allergenValidation.js
const { body } = require("express-validator");
const Allergen = require("../../models/allergenModel");

const validateCreateAllergen = [
  body("name")
    .notEmpty()
    .withMessage("Allergen name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Allergen name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingAllergen = await Allergen.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Allergen name can only contain letters, spaces and hyphens"
        );
      }

      if (existingAllergen) {
        throw new Error("Allergen name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Allergen description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Allergen description must be less than 250 characters"),
];

const validateUpdateAllergen = [
  body("name")
    .notEmpty()
    .withMessage("Allergen name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Allergen name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Allergen name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingAllergen = await Allergen.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Allergen name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the allergen with the same name has a different ID
      if (
        existingAllergen &&
        existingAllergen._id.toString() !== req.params.id
      ) {
        throw new Error("Allergen name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Allergen description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Allergen description must be less than 250 characters"),
];

module.exports = {
  validateCreateAllergen,
  validateUpdateAllergen,
};
