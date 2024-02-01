// routes/ingredientCategoryRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateIngredientCategory,
  validateUpdateIngredientCategory,
} = require("../middleware/validations/ingredientCategoryValidation");
const ingredientCategoryController = require("../controllers/ingredientCategoryController");

// Get all ingredient categories
router.get("/", ingredientCategoryController.getIngredientCategories);

// Get subcategories for a given category ID
router.get(
  "/:categoryId/subcategories",
  ingredientCategoryController.getSubcategories
);

// Create a new ingredient category
router.post(
  "/",
  validateCreateIngredientCategory,
  validateRequest,
  ingredientCategoryController.createIngredientCategory
);

// Update an existing ingredient category
router.put(
  "/:id",
  validateUpdateIngredientCategory,
  validateRequest,
  ingredientCategoryController.updateIngredientCategory
);

// Delete a ingredient category
router.delete("/:id", ingredientCategoryController.deleteIngredientCategory);

module.exports = router;
