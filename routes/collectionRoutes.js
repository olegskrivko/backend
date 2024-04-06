// routes/collectionRoutes.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateCollection,
  validateUpdateCollection,
} = require("../middleware/validations/collectionValidation");
const collectionController = require("../controllers/collectionController");

// Get all collections
router.get("/", collectionController.getCollections);

// Get filtered recipes for a collection by slug
router.get("/:slug", collectionController.getFilteredRecipesForCollection);

// Get a specific collection by slug
//router.get("/:slug/", collectionController.getFilteredRecipesForCollection);

// Get filtered recipes for a collection by slug
//router.get("/:slug/recipes", collectionController.getFilteredRecipesForCollection);

// Get a specific collection by ID
// router.get("/:id", collectionController.getCollectionById);

// Get a specific collection by slug
// router.get("/:slug", collectionController.getCollectionBySlug);

// Create a new collection
router.post(
  "/",
  validateCreateCollection,
  validateRequest,
  collectionController.createCollection
);

// Update an existing collection
router.put(
  "/:slug",
  validateUpdateCollection,
  validateRequest,
  collectionController.updateCollection
);

// Delete a collection
router.delete("/:slug", collectionController.deleteCollection);

module.exports = router;

// Classic Recipes: Time-tested recipes for dishes like lasagna, roast chicken, chocolate chip cookies, etc.

// Healthy Recipes: Collections of nutritious and balanced meals, including salads, smoothies, grain bowls, etc.

// Vegetarian and Vegan Recipes: For those who prefer plant-based diets, collections of meatless recipes including tofu stir-fries, lentil soups, veggie burgers, etc.

// Quick and Easy Recipes: Busy individuals often seek recipes that can be prepared quickly, such as one-pot meals, sheet pan dinners, and 30-minute recipes.

// Desserts and Baking: Collections of sweet treats ranging from cakes, pies, cookies, to decadent desserts like cheesecake and tiramisu.

// International Cuisine: Recipes from around the world, including Italian pasta dishes, Mexican tacos, Indian curries, Japanese sushi, and more.

// Holiday and Seasonal Recipes: Recipes tailored for specific holidays and seasons, such as Thanksgiving turkey, Christmas cookies, summer BBQ recipes, etc.

// Family-Friendly Recipes: Meals that are kid-friendly and suitable for the whole family, including dishes like macaroni and cheese, pizza, chicken tenders, etc.

// Budget-Friendly Recipes: Collections of recipes that are affordable to make, including pantry staple meals, cheap cuts of meat, and recipes that minimize waste.

// Gourmet and Fine Dining: Recipes that mimic restaurant-quality dishes, often featuring upscale ingredients and cooking techniques.
