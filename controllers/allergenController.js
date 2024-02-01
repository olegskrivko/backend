// controllers/allergenController.js
const Allergen = require("../models/allergenModel");

// Get all allergens
async function getAllergens(req, res) {
  try {
    const allergens = await Allergen.find();
    res.status(200).json(allergens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new allergen
async function createAllergen(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Creating a new Allergen instance with name and description
    const allergen = new Allergen({
      name,
      description,
    });

    // Saving the new Allergen to the database
    const savedAllergen = await allergen.save();

    res.status(201).json(savedAllergen);
  } catch (error) {
    console.error("Error creating allergen:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing allergen
async function updateAllergen(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing allergen
    const existingAllergen = await Allergen.findById(id);

    if (!existingAllergen) {
      return res.status(404).json({ error: "Allergen not found" });
    }

    // Update the allergen in the database
    const updatedAllergen = await Allergen.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.status(200).json(updatedAllergen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a allergen
async function deleteAllergen(req, res) {
  const { id } = req.params;

  try {
    await Allergen.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllergens,
  createAllergen,
  updateAllergen,
  deleteAllergen,
};
