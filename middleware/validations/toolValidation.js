// Validation middleware for the "createTool" route
const { body } = require("express-validator");
const Tool = require("../../models/toolModel");
const validator = require("validator");

const validateCreateTool = [
  body("name")
    .notEmpty()
    .withMessage("Tool is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Tool name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingTool = await Tool.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Tool name can only contain letters, spaces and hyphens"
        );
      }

      if (existingTool) {
        throw new Error("Tool already exists");
      }

      return true;
    }),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Cookware",
      "Cutlery",
      "Bakeware",
      "Utensils",
      "Appliances",
      "Kitchen Gadgets",
      "Other",
    ])
    .withMessage("Invalid category"),

  body("shopName")
    .exists()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Shop name must be less than 50 characters")
    .custom((value, { req }) => {
      // If purchaseLink is provided, shopName must be provided too
      if (req.body.purchaseLink && !value) {
        throw new Error("Shop name is required if purchase link is provided");
      }

      return true;
    }),

  body("purchaseLink")
    .exists()
    .trim()

    .custom((value, { req }) => {
      // If shopName is provided, purchaseLink must be provided too
      if (req.body.shopName && !value) {
        throw new Error("Purchase link is required if shop name is provided");
      }

      // Use isURL() validation separately
      if (value && !validator.isURL(value)) {
        throw new Error("Invalid URL format for purchase link");
      }

      return true;
    }),
];

const validateUpdateTool = [
  body("name")
    .notEmpty()
    .withMessage("Tool is required")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Tool name must be less than 50 characters")
    .custom(async (value, { req }) => {
      // Skip further checks if the title is empty or null
      if (!value) {
        return true;
      }

      // Perform the pattern and database checks together
      const patternMatch = /^[a-zA-Z\s-]+$/i.test(value);
      const existingTool = await Tool.findOne({ name: value });

      if (!patternMatch) {
        throw new Error(
          "Tool name can only contain letters, spaces and hyphens"
        );
      }

      // Check if the tool with the same name has a different ID
      if (existingTool && existingTool._id.toString() !== req.params.id) {
        throw new Error("Tool name already exists");
      }

      return true;
    }),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Cookware",
      "Cutlery",
      "Bakeware",
      "Utensils",
      "Appliances",
      "Kitchen Gadgets",
      "Other",
    ])
    .withMessage("Invalid category"),

  body("shopName")
    .exists()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Shop name must be less than 50 characters")
    .custom((value, { req }) => {
      // If purchaseLink is provided, shopName must be provided too
      if (req.body.purchaseLink && !value) {
        throw new Error("Shop name is required if purchase link is provided");
      }

      return true;
    }),

  body("purchaseLink")
    .exists()
    .trim()
    .custom((value, { req }) => {
      // If shopName is provided, purchaseLink must be provided too
      if (req.body.shopName && !value) {
        throw new Error("Purchase link is required if shop name is provided");
      }

      // Use isURL() validation separately
      if (value && !validator.isURL(value)) {
        throw new Error("Invalid URL format for purchase link");
      }

      return true;
    }),
];

module.exports = {
  validateCreateTool,
  validateUpdateTool,
};
