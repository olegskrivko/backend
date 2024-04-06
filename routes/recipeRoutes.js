// routes/recipeRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateRecipe,
} = require("../middleware/validations/recipeValidation");
const recipeController = require("../controllers/recipeController");
const {
  authenticateToken,
  isAuthenticated,
  isReviewOwner,
} = require("../middleware/authMiddleware");
const reviewRoutes = require("./reviewRoutes");

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get all recipe titles
router.get("/recipe-titles", recipeController.getAllRecipeTitles);

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

// Use the review routes within the recipe router with a prefix
// router.use("/:id/reviews", authenticateToken, isAuthenticated, reviewRoutes);
router.use("/:id/reviews", reviewRoutes);

module.exports = router;

// Get a specific recipe by ID
// router.get("/:id/reviews", reviewController.createReview);
