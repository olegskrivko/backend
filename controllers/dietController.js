// controllers/dietController.js
const slugify = require("slugify");
const Diet = require("../models/dietModel");

// Get all diets
async function getDiets(req, res) {
  try {
    const diets = await Diet.find();
    res.status(200).json(diets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new diet
async function createDiet(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Meal instance with name, description, and slug
    const diet = new Diet({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Diet to the database
    const savedDiet = await diet.save();

    res.status(201).json(savedDiet);
  } catch (error) {
    console.error("Error creating diet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing diet
async function updateDiet(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing diet
    const existingDiet = await Diet.findById(id);

    if (!existingDiet) {
      return res.status(404).json({ error: "Diet not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the diet in the database
    const updatedDiet = await Diet.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedDiet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a diet
async function deleteDiet(req, res) {
  const { id } = req.params;

  try {
    await Diet.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getDiets,
  createDiet,
  updateDiet,
  deleteDiet,
};
