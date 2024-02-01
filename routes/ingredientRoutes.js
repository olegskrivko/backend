// routes/ingredientRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateIngredient,
  validateUpdateIngredient,
} = require("../middleware/validations/ingredientValidation");
const ingredientController = require("../controllers/ingredientController");

// Get all ingredients
router.get("/", ingredientController.getIngredients);

// Create a new ingredient
router.post(
  "/",
  validateCreateIngredient,
  validateRequest,
  ingredientController.createIngredient
);

// Update an existing ingredient
router.put(
  "/:id",
  validateUpdateIngredient,
  validateRequest,
  ingredientController.updateIngredient
);

// Delete a ingredient
router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
