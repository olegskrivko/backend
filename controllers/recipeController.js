// controllers/recipeController.js
const Recipe = require("../models/recipeModel");
const Meal = require("../models/mealModel");
const Diet = require("../models/dietModel");
const Taste = require("../models/tasteModel");
const CookingMethod = require("../models/cookingMethodModel");
const Collection = require("../models/collectionModel");
const Time = require("../models/timeModel");
const mongoose = require("mongoose");
const Ingredient = require("../models/ingredientModel");
const Cuisine = require("../models/cuisineModel");

// const Cuisine = require("../models/cuisineModel");
const errorHandler = require("../middleware/errorHandler");

// async function getAllRecipes(req, res) {
//   try {
//     // Pagination parameters
//     const page = parseInt(req.query.page) || 1;
//     const limit = 12;
//     const skip = (page - 1) * limit;

//     // Fetch recipes with pagination
//     const recipes = await Recipe.find({}, "title coverImage totalTime")
//       .skip(skip)
//       .limit(limit);

//     // Count total number of recipes for pagination
//     const totalRecipes = await Recipe.countDocuments();

//     // Calculate total pages for pagination
//     const totalPages = Math.ceil(totalRecipes / limit);

//     // Return the result with pagination information
//     res.json({
//       recipes,
//       pagination: {
//         page,
//         limit,
//         totalPages,
//         totalRecipes,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Define a route for fetching recipe titles
async function getAllRecipeTitles(req, res) {
  try {
    // Fetch distinct recipe titles from the database
    const recipes = await Recipe.find({}).distinct("title"); // Assuming your Recipe model has a 'title' field

    // Return the recipe titles
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipe titles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllRecipes(req, res) {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Filtering parameters
    const {
      recipeTitle,
      // recipeAuthor,
      totalTime,
      // hasReviews,
      difficulties,
      minimumScore,
      cookingMethods,
      meals,
      diets,
      tastes,
      cuisines,
      // occasions,
      includedIngredients,
      excludedIngredients,
    } = req.query;
    console.log("Query Parameters:", req.query);

    const filters = {};

    // Add filters based on query parameters
    if (recipeTitle) {
      console.log("recipeTitle", recipeTitle);
      filters.title = { $regex: new RegExp(recipeTitle, "i") };
    }

    // Add filter for recipes with reviews
    // if (hasReviews === "true") {
    //   filters.reviews = { $exists: true, $ne: [] }; // Filter recipes with non-empty reviews array
    // }

    // Add filter for difficulty
    if (difficulties) {
      // 10 signifies that the numbers should be parsed as base-10 (decimal) integers
      // Convert the difficulty string to an array of integers
      const difficultyLevels = difficulties
        .split(",")
        .map((level) => parseInt(level.trim(), 10));

      // Add the difficulty filter to the query
      filters.difficulty = { $in: difficultyLevels };
    }

    // Add filter for meals
    if (meals) {
      const mealNames = meals.split(",").map((meal) => meal.trim());
      // Find the _id values of meals based on their names
      const mealIds = await Meal.find({ name: { $in: mealNames } }, "_id");
      // Extract the _id values from the fetched meals
      const mealIdValues = mealIds.map((meal) => meal._id);
      filters.meals = { $in: mealIdValues };
    }

    // Add filter for diets
    if (diets) {
      const dietNames = diets.split(",").map((diet) => diet.trim());
      // Find the _id values of diets based on their names
      const dietIds = await Diet.find({ name: { $in: dietNames } }, "_id");
      // Extract the _id values from the fetched diets
      const dietIdValues = dietIds.map((diet) => diet._id);
      filters.diets = { $in: dietIdValues };
    }

    // Add filter for cuisines
    if (cuisines) {
      const cuisineNames = cuisines.split(",").map((cuisine) => cuisine.trim());
      // Find the _id values of cuisines based on their names
      const cuisineIds = await Cuisine.find(
        { name: { $in: cuisineNames } },
        "_id"
      );
      // Extract the _id values from the fetched cuisines
      const cuisineIdValues = cuisineIds.map((cuisine) => cuisine._id);
      filters.cuisines = { $in: cuisineIdValues };
    }

    // Add filter for tastes
    if (tastes) {
      const tasteNames = tastes.split(",").map((taste) => taste.trim());
      // Find the _id values of tastes based on their names
      const tasteIds = await Taste.find({ name: { $in: tasteNames } }, "_id");
      // Extract the _id values from the fetched tastes
      const tasteIdValues = tasteIds.map((taste) => taste._id);
      filters.tastes = { $in: tasteIdValues };
    }

    // Add filter for cooking methods
    if (cookingMethods) {
      const cookingMethodNames = cookingMethods
        .split(",")
        .map((cookingMethod) => cookingMethod.trim());
      // Find the _id values of cooking methods based on their names
      const cookingMethodIds = await CookingMethod.find(
        { name: { $in: cookingMethodNames } },
        "_id"
      );
      // Extract the _id values from the fetched cooking methods
      const cookingMethodIdValues = cookingMethodIds.map(
        (cookingMethod) => cookingMethod._id
      );
      filters.cookingMethods = { $in: cookingMethodIdValues };
    }

    // Add filter for total time
    if (totalTime) {
      // Split the totalTime string into an array containing min and max times
      const [minTime, maxTime] = totalTime.split(",");

      // Convert the min and max times to numbers
      const minTimeNum = parseInt(minTime);
      const maxTimeNum = maxTime === "Infinity" ? Infinity : parseInt(maxTime);

      // Add the totalTime filter to the query
      filters.totalTime = { $gte: minTimeNum, $lte: maxTimeNum };
    }

    // Add filter for included ingredients

    // Inside the async function getAllRecipes
    // Add filter for included ingredients
    // if (includedIngredients) {
    //   const includedIngredientIds = includedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for included ingredients
    //   filters["ingredients.items.ingredient"] = { $in: includedIngredientIds };
    // }

    // // Add filter for excluded ingredients
    // if (excludedIngredients) {
    //   const excludedIngredientIds = excludedIngredients
    //     .split(",")
    //     .map((ingredientId) => ingredientId.trim());

    //   // Add the filter for excluded ingredients
    //   filters["ingredients.items.ingredient"] = { $nin: excludedIngredientIds };
    // }

    // Add filter for included ingredients
    if (includedIngredients) {
      const includedIngredientIds = includedIngredients
        .split(",")
        .map((ingredientId) => ingredientId.trim());

      // Add the filter for included ingredients
      filters["ingredients.items.ingredient"] = { $all: includedIngredientIds };
    }

    // Add filter for excluded ingredients
    if (excludedIngredients) {
      const excludedIngredientIds = excludedIngredients
        .split(",")
        .map((ingredientId) => ingredientId.trim());

      // Add the filter for excluded ingredients
      filters["ingredients.items.ingredient"] = { $nin: excludedIngredientIds };
    }

    // You can add more filters based on your needs

    // Fetch recipes with pagination and filtering
    const recipes = await Recipe.find(filters, "title coverImage totalTime")
      .skip(skip)
      .limit(limit);

    // Count total number of recipes for pagination
    const totalRecipes = await Recipe.countDocuments(filters);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecipes / limit);

    // Return the result with pagination information
    res.json({
      recipes,
      pagination: {
        page,
        limit,
        totalPages,
        totalRecipes,
      },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// async function getAllRecipes(req, res) {
//   try {
//     const recipes = await Recipe.find();
//     // .populate("occasions")
//     // .populate({
//     //   path: "reviews",
//     //   model: "Review",
//     //   populate: {
//     //     path: "user",
//     //     model: "User",
//     //     select: "username email", // Specify the fields you need
//     //   },
//     // })
//     // .populate("meals")
//     // .populate("cuisines")
//     // .populate("tools")
//     // .populate("times")
//     // .populate("diets")
//     // .populate("cookingMethods")
//     // .populate({
//     //   path: "instructions.steps",
//     //   model: "Step",
//     // })
//     // .populate({
//     //   path: "ingredients.items.ingredient",
//     //   model: "Ingredient",
//     //   populate: {
//     //     path: "allowedUnits.unit",
//     //     model: "Unit",
//     //   },
//     // });

//     // .populate({
//     //   path: "ingredients.items.ingredient",
//     //   model: "Ingredient",
//     // })
//     // Perform a separate population for allowedUnits.unit

//     console.log(JSON.stringify(recipes, null, 2)); // Log the populated data
//     res.json(recipes);
//   } catch (error) {
//     console.error("Error fetching all recipes:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function getRecipeById(req, res) {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id)
      .populate("meals")
      .populate("cuisines")
      .populate("tools")
      .populate("collections")
      // .populate("times")
      .populate("occasions")
      .populate("diets")
      .populate("cookingMethods")
      .populate({
        path: "instructions.steps",
        model: "Step",
      })
      .populate({
        path: "ingredients.items.ingredient",
        model: "Ingredient",
        populate: {
          path: "allowedUnits.unit",
          model: "Unit",
        },
      })
      .populate({
        path: "reviews",
        model: "Review",
        populate: {
          path: "user",
          model: "User",
          select: "username email", // Specify the fields you need
        },
      });
    // .populate({
    //   path: "ingredients.items.ingredient",
    //   model: "Ingredient",
    //   // select: "name calories fat carbohydrates fiber sugar protein",
    // });

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }
    console.log(recipe);
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createRecipe(req, res) {
  const {
    title,
    description,
    difficulty,
    meals, // Assuming meals is an array of meal IDs
    instructions,
    cuisines,
    occasions,
    collections,
    tools,
    cookingMethods,
    servings,
    ingredients,
    times,
    diets,
    tips,
    tags,
  } = req.body;

  console.log("Request Body:", req.body); // Log the request body
  console.log("Times received from frontend:");
  // times.forEach((time, index) => {
  //   console.log(`Time ${index + 1}:`);
  //   console.log(`_id: ${time._id}`);
  //   console.log(`label: ${time.label}`);
  //   console.log(`value: ${JSON.stringify(time.value)}`);
  //   console.log(`hours: ${time.value.hours}`);
  //   console.log(`minutes: ${time.value.minutes}`);
  //   console.log("__v: ${time.__v}\n");
  // });

  try {
    // Construct the array of times to be added to the recipe
    // Calculate total time in minutes
    const totalMinutes = times.reduce(
      (total, timeData) =>
        total +
        parseInt(timeData.hours || 0) * 60 +
        parseInt(timeData.minutes || 0),
      0
    );

    const newRecipe = new Recipe({
      title,
      description,
      meals,
      difficulty,
      instructions,
      cuisines,
      occasions,
      collections,
      tools,
      cookingMethods,
      servings,
      ingredients,
      times,
      totalTime: totalMinutes,
      diets,
      tips,
      tags,
    });
    // console.log(newRecipe)
    await newRecipe.save();

    // Update each meal with the new recipe's ID
    for (const mealId of meals) {
      await Meal.findByIdAndUpdate(mealId, {
        $push: { recipes: newRecipe._id },
      });
    }

    for (const collectionId of collections) {
      await Collection.findByIdAndUpdate(collectionId, {
        $push: { recipes: newRecipe._id },
      });
    }

    // Associate the new recipe with collections using their slugs
    // for (const collectionSlug of collections) {
    //   const collection = await Collection.findOne({ slug: collectionSlug });
    //   console.log("collection", collection);
    //   if (collection) {
    //     await Collection.findByIdAndUpdate(collection._id, {
    //       $push: { recipes: newRecipe._id },
    //     });
    //   }
    // }

    for (const cookingMethodId of cookingMethods) {
      await CookingMethod.findByIdAndUpdate(cookingMethodId, {
        $push: { recipes: newRecipe._id },
      });
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    errorHandler.handleUnexpectedErrors(error, req, res);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateRecipe(req, res) {
  const { id } = req.params;
  const {
    title,
    description,
    meals,
    difficulty,
    cuisines,
    occasions,
    servings,
    tools,
    cookMethod,
    times,
    diets,
    tips,
    tags,
  } = req.body;

  // Input validation
  if (
    !title ||
    !description ||
    !meals ||
    !difficulty ||
    !cuisines ||
    !occasions ||
    !servings ||
    !tools ||
    !cookMethod ||
    !times ||
    !diets ||
    !tips ||
    !tags
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        description,
        meals,
        difficulty,
        cuisines,
        occasions,
        servings,
        tools,
        cookMethod,
        times,
        diets,
        tips,
        tags,
      },
      { new: true }
    );

    if (!updatedRecipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(updatedRecipe);
  } catch (error) {
    errorHandler.handleUnexpectedErrors(error, req, res);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteRecipe(req, res) {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(deletedRecipe);
  } catch (error) {
    errorHandler.handleUnexpectedErrors(error, req, res);
    // res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllRecipes,
  getAllRecipeTitles,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
