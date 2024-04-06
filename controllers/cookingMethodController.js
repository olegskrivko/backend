// controllers/cookingMethodController.js
const slugify = require("slugify");
const CookingMethod = require("../models/cookingMethodModel");

// Get all cooking methods
// async function getCookingMethods(req, res) {
//   try {
//     const cookingMethods = await CookingMethod.find();
//     res.status(200).json(cookingMethods);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Get all cooking methods with recipe counts
// Get all cooking methods with recipe counts
async function getCookingMethods(req, res) {
  try {
    // Get all cooking methods and populate the 'recipes' field
    const cookingMethods = await CookingMethod.find().populate("recipes");

    // Create an array to store cooking methods with counts
    const cookingMethodsWithCounts = [];

    // Iterate over each cooking method and fetch the count of associated recipes
    for (const cookingMethod of cookingMethods) {
      //console.log("cookingMethod.recipes", cookingMethod.recipes);
      const count = cookingMethod.recipes.length; // Count the number of recipes for the cooking method
      cookingMethodsWithCounts.push({
        _id: cookingMethod._id,
        name: cookingMethod.name,
        count,
      });
    }
    //console.log("cookingMethodsWithCounts", cookingMethodsWithCounts);
    // Send the modified array with counts in the response
    res.status(200).json(cookingMethodsWithCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new cooking method
async function createCookingMethod(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Meal instance with name, description, and slug
    const cookingMethod = new CookingMethod({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new CookingMethod to the database
    const savedCookingMethod = await cookingMethod.save();

    res.status(201).json(savedCookingMethod);
  } catch (error) {
    console.error("Error creating cooking method:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing cooking method
async function updateCookingMethod(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing cooking method
    const existingCookingMethod = await CookingMethod.findById(id);

    if (!existingCookingMethod) {
      return res.status(404).json({ error: "Cooking method not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the cooking method in the database
    const updatedCookingMethod = await CookingMethod.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedCookingMethod);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a cooking method
async function deleteCookingMethod(req, res) {
  const { id } = req.params;

  try {
    await CookingMethod.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCookingMethods,
  createCookingMethod,
  updateCookingMethod,
  deleteCookingMethod,
};
