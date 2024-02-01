// controllers/cuisineController.js
const slugify = require("slugify");
const Cuisine = require("../models/cuisineModel");

// Get all cuisines
async function getCuisines(req, res) {
  try {
    const cuisines = await Cuisine.find();
    res.status(200).json(cuisines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new cuisine
async function createCuisine(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Cuisine instance with name and description
    const cuisine = new Cuisine({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`,
    });

    // Saving the new Cuisine to the database
    const savedCuisine = await cuisine.save();

    res.status(201).json(savedCuisine);
  } catch (error) {
    console.error("Error creating cuisine:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing cuisine
async function updateCuisine(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing cuisine
    const existingCuisine = await Cuisine.findById(id);

    if (!existingCuisine) {
      return res.status(404).json({ error: "Cuisine not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the cuisine in the database
    const updatedCuisine = await Cuisine.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedCuisine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a cuisine
async function deleteCuisine(req, res) {
  const { id } = req.params;

  try {
    await Cuisine.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCuisines,
  createCuisine,
  updateCuisine,
  deleteCuisine,
};
