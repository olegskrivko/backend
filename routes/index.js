// routes/index.js
const express = require("express");
const router = express.Router();
const recipeRoutes = require("./recipeRoutes");
const mealRoutes = require("./mealRoutes");
const cuisineRoutes = require("./cuisineRoutes");
const occasionRoutes = require("./occasionRoutes");
const toolRoutes = require("./toolRoutes");
const allergenRoutes = require("./allergenRoutes");
const cookingMethodRoutes = require("./cookingMethodRoutes");
const dietRoutes = require("./dietRoutes");
const ingredientRoutes = require("./ingredientRoutes");
const unitRoutes = require("./unitRoutes");
const ingredientCategoryRoutes = require("./ingredientCategoryRoutes");
const timeRoutes = require("./timeRoutes");
const userRoutes = require("./userRoutes");

const {
  authenticateToken,
  isAuthenticated,
  isRecipeOwner,
} = require("../middleware/authMiddleware");

// routes
// router.use("/recipes", authenticateToken, isAuthenticated, recipeRoutes);
router.use("/recipes", recipeRoutes);
router.use("/meals", mealRoutes);
router.use("/cuisines", cuisineRoutes);
router.use("/occasions", occasionRoutes);
router.use("/tools", toolRoutes);
router.use("/allergens", allergenRoutes);
router.use("/cooking-methods", cookingMethodRoutes);
router.use("/diets", dietRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/units", unitRoutes);
router.use("/ingredient-categories", ingredientCategoryRoutes);
router.use("/times", timeRoutes);
router.use("/users", userRoutes);

module.exports = router;

// const { authenticateToken, isAuthenticated, isOwner } = require("./middleware/authMiddleware");

// // Example usage in a route handler
// app.post("/api/posts", authenticateToken, isAuthenticated, (req, res) => {
//   // Only authenticated users can create posts
//   // Additional logic...
// });

// app.put("/api/posts/:postId", authenticateToken, isAuthenticated, isOwner, (req, res) => {
//   // Only the owner of the post can update it
//   // Additional logic...
// });
