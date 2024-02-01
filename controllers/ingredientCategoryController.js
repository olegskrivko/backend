// controllers/ingredientCategoryController.js
const slugify = require("slugify");
const IngredientCategory = require("../models/ingredientCategoryModel");

// Get all ingredient categories
async function getIngredientCategories(req, res) {
  try {
    // const ingredientCategories = await IngredientCategory.find();
    const ingredientCategories = await IngredientCategory.find().populate(
      "parentCategory"
    );
    // res.status(200).json(ingredientCategories);
    res.status(200).json(ingredientCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// Get subcategories for a given category ID
const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subcategories = await IngredientCategory.find({
      parentCategory: categoryId,
    });
    res.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new ingredient category
const createIngredientCategory = async (req, res) => {
  const { name, description, parentCategory } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await IngredientCategory.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new ingredient category
    const newIngredientCategory = new IngredientCategory({
      name,

      description,
      parentCategory,
    });

    // Save the ingredient category to the database
    await newIngredientCategory.save();

    res.status(201).json({
      message: "Ingredient category created successfully",
      category: newIngredientCategory,
    });
  } catch (error) {
    console.error("Error creating ingredient category:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const createIngredientCategory = async (req, res) => {
//   const { categoryName, subcategories } = req.body;

//   try {
//     // Check if the category already exists
//     const existingCategory = await IngredientCategory.findOne({ categoryName });

//     if (existingCategory) {
//       return res.status(400).json({ error: "Category already exists" });
//     }

//     // Create a new ingredient category
//     const newIngredientCategory = new IngredientCategory({
//       categoryName,
//       subcategories,
//     });

//     // Save the ingredient category to the database
//     await newIngredientCategory.save();

//     res
//       .status(201)
//       .json({
//         message: "Ingredient category created successfully",
//         category: newIngredientCategory,
//       });
//   } catch (error) {
//     console.error("Error creating ingredient category:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// async function createIngredientCategory(req, res) {
//   try {
//     // Extracting data from the request body
//     const { name, description } = req.body;

//     // Validation
//     if (!name || !description) {
//       return res
//         .status(400)
//         .json({ error: "Name and description are required." });
//     }

//     // Set the slug based on the name
//     const slug = slugify(name, { lower: true });

//     // Creating a new IngredientCategory instance with name, description, and slug
//     const ingredientCategory = new IngredientCategory({
//       name,
//       description,
//       slug,
//       imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
//     });

//     // Saving the new IngredientCategory to the database
//     const savedIngredientCategory = await ingredientCategory.save();

//     res.status(201).json(savedIngredientCategory);
//   } catch (error) {
//     console.error("Error creating ingredient category:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Update an existing ingredient category
async function updateIngredientCategory(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing updated ingredient category
    const existingIngredientCategory = await IngredientCategory.findById(id);

    if (!existingIngredientCategory) {
      return res.status(404).json({ error: "Ingredient category not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the ingredient category in the database
    const updatedIngredientCategory =
      await IngredientCategory.findByIdAndUpdate(
        id,
        { name, description, slug, imageUrl },
        { new: true }
      );

    res.status(200).json(updatedIngredientCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a ingredient category
async function deleteIngredientCategory(req, res) {
  const { id } = req.params;

  try {
    await IngredientCategory.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getIngredientCategories,
  getSubcategories,
  createIngredientCategory,
  updateIngredientCategory,
  deleteIngredientCategory,
};
