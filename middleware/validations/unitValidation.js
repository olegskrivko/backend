// middleware/validations/unitValidation.js
const { body } = require("express-validator");
const Unit = require("../../models/unitModel");

const validateCreateUnit = [
  body("name")
    .notEmpty()
    .withMessage("Unit name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Unit name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingUnit = await Unit.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Unit name can only contain letters, spaces and hyphens"
        );
      }

      if (existingUnit) {
        throw new Error("Unit name already exists");
      }

      return true;
    }),

  body("abbreviation")
    .notEmpty()
    .withMessage("Unit abbreviation cannot be empty")
    .trim()
    .isLength({ max: 10 })
    .withMessage("Unit abbreviation must be less than 10 characters"),

  body("isBaseUnit")
    .notEmpty()
    .isBoolean()
    .withMessage("Base unit must be a true or false"),

  body("conversionFactor")
    .notEmpty()
    .isNumeric()
    .withMessage("Unit conversion factor must be a number")
    .isFloat({ max: 1000 })
    .withMessage("Unit conversion factor must be less than or equal to 1000"),

  body("system")
    .notEmpty()
    .withMessage("Unit system is required")
    .isIn(["Metric", "Imperial"])
    .withMessage('System must be either "Metric" or "Imperial"'),
];

const validateUpdateUnit = [
  body("name")
    .notEmpty()
    .withMessage("Unit name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Unit name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Unit name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingUnit = await Unit.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Unit name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the unit with the same name has a different ID
      if (existingUnit && existingUnit._id.toString() !== req.params.id) {
        throw new Error("Unit name already exists");
      }

      return true;
    }),

  body("abbreviation")
    .notEmpty()
    .withMessage("Unit abbreviation cannot be empty")
    .trim()
    .isLength({ max: 10 })
    .withMessage("Unit abbreviation must be less than 10 characters"),

  body("isBaseUnit")
    .notEmpty()
    .isBoolean()
    .withMessage("Base unit must be a true or false"),

  body("conversionFactor")
    .notEmpty()
    .isNumeric()
    .withMessage("Unit conversion factor must be a number")
    .isFloat({ max: 1000 })
    .withMessage("Unit conversion factor must be less than or equal to 1000"),

  body("system")
    .notEmpty()
    .withMessage("Unit system is required")
    .isIn(["Metric", "Imperial"])
    .withMessage('System must be either "Metric" or "Imperial"'),
];

module.exports = {
  validateCreateUnit,
  validateUpdateUnit,
};
