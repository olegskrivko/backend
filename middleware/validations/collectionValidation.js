// middleware/validations/collectionValidation.js
const { body } = require("express-validator");
const Collection = require("../../models/collectionModel");

const validateCreateCollection = [
  body("name")
    .notEmpty()
    .withMessage("Collection name is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Collection name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingCollection = await Collection.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Collection name can only contain letters, spaces and hyphens"
        );
      }

      if (existingCollection) {
        throw new Error("Collection name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Collection description is required")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Collection description must be less than 250 characters"),
];

const validateUpdateCollection = [
  body("name")
    .notEmpty()
    .withMessage("Collection name cannot be empty")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Collection name must be less than 50 characters")
    .custom(async (value, { req }) => {
      if (!value.trim()) {
        throw new Error("Collection name is required");
      }

      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingCollection = await Collection.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Collection name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the collection with the same name has a different ID
      if (
        existingCollection &&
        existingCollection._id.toString() !== req.params.id
      ) {
        throw new Error("Collection name already exists");
      }

      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("Collection description cannot be empty")
    .trim()
    .isLength({ max: 250 })
    .withMessage("Collection description must be less than 250 characters"),
];

module.exports = {
  validateCreateCollection,
  validateUpdateCollection,
};
