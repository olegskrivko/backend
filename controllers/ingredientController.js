// controllers/ingredientController.js
const slugify = require("slugify");
const Ingredient = require("../models/ingredientModel");
const IngredientCategory = require("../models/ingredientCategoryModel");

// Get all ingredients
async function getIngredients(req, res) {
  try {
    const ingredients = await Ingredient.find()
      .populate({
        path: "category",
        select: "name", // Select the fields you want from the category
      })
      .populate({
        path: "allowedUnits.unit",
        select: "name", // Select the fields you want from the allowedUnits.unit
      });

    // Map the ingredients to include the category name and allowedUnits names instead of just the category and allowedUnits IDs
    const ingredientsWithCategoryNames = ingredients.map((ingredient) => ({
      ...ingredient._doc, // Copy the document
      category: ingredient.category ? ingredient.category.name : null, // Replace category ID with category name
      allowedUnits: ingredient.allowedUnits.map((au) => ({
        unit: au.unit ? au.unit.name : null, // Replace allowedUnit ID with allowedUnit name
        conversionFactor: au.conversionFactor,
      })),
    }));

    res.status(200).json(ingredientsWithCategoryNames);
    // const ingredients = await Ingredient.find().populate("category"); // Populate the 'category' field

    // // Map the ingredients to include the category name instead of just the category ID
    // const ingredientsWithCategoryNames = ingredients.map((ingredient) => ({
    //   ...ingredient._doc, // Copy the document
    //   category: ingredient.category ? ingredient.category.name : null, // Replace category ID with category name
    // }));

    // res.status(200).json(ingredientsWithCategoryNames);
    // const ingredients = await Ingredient.find();
    // res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new ingredient
const createIngredient = async (req, res) => {
  try {
    // Extracting data from the request body
    const {
      name,
      description,
      calories,
      fat,
      carbohydrates,
      fiber,
      sugar,
      protein,
      amount,
      category,
      allowedUnits,
    } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Create an array to store the allowed units
    const allowedUnitsArray = allowedUnits.map(
      ({ unit, conversionFactor }) => ({
        unit,
        conversionFactor,
      })
    );

    // Creating a new Ingredient instance with name, description, and slug
    const ingredient = new Ingredient({
      name,
      description,
      calories,
      fat,
      carbohydrates,
      fiber,
      sugar,
      protein,
      amount,
      category,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
      allowedUnits: allowedUnitsArray,
    });

    // Saving the new Ingredient to the database
    const savedIngredient = await ingredient.save();

    // Find the corresponding IngredientCategory and update its ingredients array
    await IngredientCategory.findOneAndUpdate(
      { _id: category },
      { $push: { ingredients: savedIngredient._id } },
      { new: true }
    );

    res.status(201).json(savedIngredient);
  } catch (error) {
    console.error("Error creating ingredient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createIngredient = async (req, res) => {
//   try {
//     // Extracting data from the request body
//     const {
//       name,
//       description,
//       calories,
//       fat,
//       carbohydrates,
//       fiber,
//       sugar,
//       protein,
//       amount,
//       category,
//       allowedUnits,
//     } = req.body;

//     console.log(allowedUnits);

//     // Set the slug based on the name
//     const slug = slugify(name, { lower: true });

//     // Creating a new Ingredient instance with name, description, and slug
//     const ingredient = new Ingredient({
//       name,
//       description,
//       calories,
//       fat,
//       carbohydrates,
//       fiber,
//       sugar,
//       protein,
//       amount,
//       category,
//       slug,
//       imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
//       allowedUnits: [
//         {
//           unit,
//           conversionFactor,
//         },
//       ],
//     });

//     // Saving the new Ingredient to the database
//     const savedIngredient = await ingredient.save();

//     // Find the corresponding IngredientCategory and update its ingredients array
//     await IngredientCategory.findOneAndUpdate(
//       { _id: category },
//       { $push: { ingredients: savedIngredient._id } },
//       { new: true }
//     );

//     res.status(201).json(savedIngredient);
//   } catch (error) {
//     console.error("Error creating ingredient:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// async function createIngredient(req, res) {
//   try {
//     // Extracting data from the request body
//     const {
//       name,
//       description,
//       calories,
//       fat,
//       carbohydrates,
//       fiber,
//       sugar,
//       protein,
//       amount,
//       unit,
//       category,
//     } = req.body;

//     // Set the slug based on the name
//     const slug = slugify(name, { lower: true });

//     // Creating a new Ingredient instance with name, description, and slug
//     const ingredient = new Ingredient({
//       name,
//       description,
//       calories,
//       fat,
//       carbohydrates,
//       fiber,
//       sugar,
//       protein,
//       amount,
//       unit,
//       category,
//       slug,
//       imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
//     });
//     // Saving the new Ingredient to the database
//     const savedIngredient = await ingredient.save();

//     // Find the corresponding IngredientCategory and update its ingredients array
//     await IngredientCategory.findOneAndUpdate(
//       { _id: category },
//       { $push: { ingredients: savedIngredient._id } },
//       { new: true }
//     );

//     res.status(201).json(savedIngredient);
//   } catch (error) {
//     console.error("Error creating ingredient:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Update an existing ingredient
async function updateIngredient(req, res) {
  const { id } = req.params;
  const {
    name,
    description,
    calories,
    fat,
    carbohydrates,
    fiber,
    sugar,
    protein,
    amount,
    unit,
    category,
  } = req.body;

  try {
    // Fetch the existing ingredient
    const existingIngredient = await Ingredient.findById(id);

    if (!existingIngredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the ingredient in the database
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      id,
      {
        name,
        description,
        calories,
        fat,
        carbohydrates,
        fiber,
        sugar,
        protein,
        amount,
        unit,
        category,
        slug,
        imageUrl,
      },
      { new: true }
    );

    res.status(200).json(updatedIngredient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a ingredient
async function deleteIngredient(req, res) {
  const { id } = req.params;

  try {
    await Ingredient.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
