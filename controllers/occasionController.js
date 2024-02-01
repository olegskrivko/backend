// controllers/occasionController.js
const slugify = require("slugify");
const Occasion = require("../models/occasionModel");

// Get all occasions
async function getOccasions(req, res) {
  try {
    const occasions = await Occasion.find();
    res.status(200).json(occasions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new occasion
async function createOccasion(req, res) {
  try {
    // Extracting data from the request body
    const { name, description, season } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Occasion instance with name and description
    const occasion = new Occasion({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Occasion to the database
    const savedOccasion = await occasion.save();

    res.status(201).json(savedOccasion);
  } catch (error) {
    console.error("Error creating occasion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing occasion
async function updateOccasion(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedOccasion = await Occasion.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedOccasion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a occasion
async function deleteOccasion(req, res) {
  const { id } = req.params;

  try {
    await Occasion.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getOccasions,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
