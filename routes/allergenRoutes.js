// routes/allergenRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateAllergen,
  validateUpdateAllergen,
} = require("../middleware/validations/allergenValidation");
const allergenController = require("../controllers/allergenController");

// Get all allergens
router.get("/", allergenController.getAllergens);

// Create a new allergen
router.post(
  "/",
  validateCreateAllergen,
  validateRequest,
  allergenController.createAllergen
);

// Update an existing allergen
router.put(
  "/:id",
  validateUpdateAllergen,
  validateRequest,
  allergenController.updateAllergen
);

// Delete a allergen
router.delete("/:id", allergenController.deleteAllergen);

module.exports = router;
