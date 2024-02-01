// routes/cuisineRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateCuisine,
  validateUpdateCuisine,
} = require("../middleware/validations/cuisineValidation");
const cuisineController = require("../controllers/cuisineController");

// Get all cuisines
router.get("/", cuisineController.getCuisines);

// Create a new cuisine
router.post(
  "/",
  validateCreateCuisine,
  validateRequest,
  cuisineController.createCuisine
);

// Update an existing cuisine
router.put(
  "/:id",
  validateUpdateCuisine,
  validateRequest,
  cuisineController.updateCuisine
);

// Delete a cuisine
router.delete("/:id", cuisineController.deleteCuisine);

module.exports = router;
