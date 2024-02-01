// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateRecipe,
} = require("../middleware/validations/recipeValidation");
const recipeController = require("../controllers/recipeController");

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get a specific recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Create a new recipe
router.post(
  "/",
  validateCreateRecipe,
  validateRequest,
  recipeController.createRecipe
);

// Update an existing recipe
router.put("/:id", recipeController.updateRecipe);

// Delete a recipe
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
