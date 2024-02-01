// controllers/mealController.js
const slugify = require("slugify");
const Meal = require("../models/mealModel");

// Get all meals
async function getMeals(req, res) {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
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
  createMeal,
  updateMeal,
  deleteMeal,
};
