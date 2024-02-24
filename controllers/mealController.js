// controllers/mealController.js
const slugify = require("slugify");
const Meal = require("../models/mealModel");
const Recipe = require("../models/recipeModel"); // Import your Recipe model

// Get all meals
async function getMeals(req, res) {
  try {
    // Use Mongoose's populate to get meals with populated recipes
    const meals = await Meal.find().populate("recipes");
    // console.log("meals", meals);
    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a meal by ID
async function getMealById(req, res) {
  const { id } = req.params;
  // console.log("id", id);
  try {
    const meal = await Meal.findById(id).populate("recipes");
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    // console.log("meal", meal);
    res.status(200).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// 65a9b94e8422af81b441c57c
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c?totalTime=240

// Get a meal by ID with optional filtering
// async function getMealById(req, res) {
//   const { id } = req.params;
//   const { totalTime, diets } = req.query;

//   try {
//     const meal = await Meal.findById(id).populate("recipes");

//     if (!meal) {
//       return res.status(404).json({ error: "Meal not found" });
//     }

//     // If cookingTime is provided, filter recipes based on cooking time
//     let filteredRecipes = meal.recipes;
//     if (totalTime) {
//       filteredRecipes = filteredRecipes.filter(
//         (recipe) => recipe.totalTime <= parseInt(totalTime)
//       );
//     }

//     // You can add more filters for diets or other criteria if needed

//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c/recipes?filter[totalTime]=240
// Fetch filtered recipes for a meal
// async function getFilteredRecipesForMeal(req, res) {
//   const { id } = req.params;
//   console.log("rooooutexxxxx", id);
//   const { totalTime, diets } = req.query;

//   try {
//     const meal = await Meal.findById(id).populate("recipes");
//     console.log("mealTESTINGx", meal);
//     if (!meal) {
//       return res.status(404).json({ error: "Meal not found" });
//     }

//     // If cookingTime is provided, filter recipes based on cooking time
//     let filteredRecipes = meal.recipes;
//     if (totalTime) {
//       filteredRecipes = filteredRecipes.filter(
//         (recipe) => recipe.totalTime <= parseInt(totalTime)
//       );
//     }

//     // You can add more filters for diets or other criteria if needed

//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c/recipes?filter[totalTime]=240
// Fetch filtered recipes for a meal
async function getFilteredRecipesForMeal(req, res) {
  const { id } = req.params;
  console.log("params", id);
  const { totalTime, servings } = req.query;
  console.log("totalTime", totalTime);
  console.log("servings", servings);
  console.log("Route hit:", req.url);
  console.log("Received parameters:", req.params, req.query);
  try {
    const meal = await Meal.findById(id).populate("recipes");
    // console.log("mealTESTINGx", meal);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    let filteredRecipes = meal.recipes;
    // If totalTime is provided, filter recipes based on totalTime
    if (totalTime) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.totalTime <= parseInt(totalTime)
      );
    }

    // If servings is provided, filter recipes based on servings
    if (servings) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.servings <= parseInt(servings)
      );
    }

    // If no filters applied, return all recipes
    if (!totalTime && !servings) {
      filteredRecipes = meal.recipes;
    }
    // console.log("filteredRecipes", filteredRecipes);
    // You can add more filters for diets or other criteria if needed

    res.status(200).json(filteredRecipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new meal
async function createMeal(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Meal instance with name, description, and slug
    const meal = new Meal({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Meal to the database
    const savedMeal = await meal.save();

    res.status(201).json(savedMeal);
  } catch (error) {
    console.error("Error creating meal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing meal
async function updateMeal(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing meal
    const existingMeal = await Meal.findById(id);

    if (!existingMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the meal in the database
    const updatedMeal = await Meal.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a meal
async function deleteMeal(req, res) {
  const { id } = req.params;

  try {
    await Meal.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getMeals,
  getMealById,
  getFilteredRecipesForMeal,
  createMeal,
  updateMeal,
  deleteMeal,
};
