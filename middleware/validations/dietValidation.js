// middleware/validations/dietValidation.js
const { body } = require("express-validator");
const Diet = require("../../models/dietModel");

const validateCreateDiet = [
  body("name")
    .notEmpty()
    .withMessage("Diet name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Diet name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingDiet = await Diet.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Diet name can only contain letters, spaces and hyphens"
        );
      }

      if (existingDiet) {
        throw new Error("Diet name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Diet description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Diet description must be less than 250 characters"),
];

const validateUpdateDiet = [
  body("name")
    .notEmpty()
    .withMessage("Diet name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Diet name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Diet name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingDiet = await Diet.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Diet name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the diet with the same name has a different ID
      if (existingDiet && existingDiet._id.toString() !== req.params.id) {
        throw new Error("Diet name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Diet description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Diet description must be less than 250 characters"),
];

module.exports = {
  validateCreateDiet,
  validateUpdateDiet,
};
