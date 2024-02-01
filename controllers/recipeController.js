// controllers/recipeController.js
const Recipe = require("../models/recipeModel");
const Meal = require("../models/mealModel");
const Time = require("../models/timeModel");

// const Cuisine = require("../models/cuisineModel");
const errorHandler = require("../middleware/errorHandler");

async function getAllRecipes(req, res) {
  try {
    // Use .populate() to populate the 'cuisines' field with actual Cuisine documents
    // const recipes = await Recipe.find().populate("cuisines").exec();
    const recipes = await Recipe.find()
      .populate("occasions")
      .populate("meals")
      .populate("cuisines")
      .populate("tools")
      // .populate("times")
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
      });
    // .populate({
    //   path: "ingredients.items.ingredient",
    //   model: "Ingredient",
    // })
    // Perform a separate population for allowedUnits.unit

    console.log(JSON.stringify(recipes, null, 2)); // Log the populated data
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getRecipeById(req, res) {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id)
      .populate("meals")
      .populate("cuisines")
      .populate("tools")
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
    console.log;
    const newRecipe = new Recipe({
      title,
      description,
      meals,
      difficulty,
      instructions,
      cuisines,
      occasions,
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
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
