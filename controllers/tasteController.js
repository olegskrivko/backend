// controllers/tasteController.js
const slugify = require("slugify");
const Taste = require("../models/tasteModel");

// Get all tastes
async function getTastes(req, res) {
  try {
    const tastes = await Taste.find();
    res.status(200).json(tastes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new taste
async function createTaste(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Taste instance with name, description, and slug
    const taste = new Taste({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Taste to the database
    const savedTaste = await taste.save();

    res.status(201).json(savedTaste);
  } catch (error) {
    console.error("Error creating taste:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing taste
async function updateTaste(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing taste
    const existingTaste = await Taste.findById(id);

    if (!existingTaste) {
      return res.status(404).json({ error: "Taste not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the taste in the database
    const updatedTaste = await Taste.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedTaste);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a taste
async function deleteTaste(req, res) {
  const { id } = req.params;

  try {
    await Taste.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getTastes,
  createTaste,
  updateTaste,
  deleteTaste,
};
