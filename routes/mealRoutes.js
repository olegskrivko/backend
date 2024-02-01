// routes/mealRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateMeal,
  validateUpdateMeal,
} = require("../middleware/validations/mealValidation");
const mealController = require("../controllers/mealController");

// Get all meals
router.get("/", mealController.getMeals);

// Create a new meal
router.post(
  "/",
  validateCreateMeal,
  validateRequest,
  mealController.createMeal
);

// Update an existing meal
router.put(
  "/:id",
  validateUpdateMeal,
  validateRequest,
  mealController.updateMeal
);

// Delete a meal
router.delete("/:id", mealController.deleteMeal);

module.exports = router;
