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

// routes
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

module.exports = router;
