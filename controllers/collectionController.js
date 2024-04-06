// controllers/collectionController.js
const slugify = require("slugify");
const Collection = require("../models/collectionModel");
const Meal = require("../models/mealModel");
const Recipe = require("../models/recipeModel"); // Import your Recipe model
const CookingMethod = require("../models/cookingMethodModel");

// Get all collections
async function getCollections(req, res) {
  try {
    // Use Mongoose's populate to get collections with populated recipes
    const collections = await Collection.find().populate("recipes");

    res.status(200).json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function getFilteredRecipesForCollection(req, res) {
  const { slug } = req.params;
  console.log("slug", slug);

  const { recipeTitle, recipeAuthor, cookingMethods } = req.query;

  try {
    const collection = await Collection.findOne({ slug }).populate({
      path: "recipes",
      populate: {
        path: "cookingMethods",
        model: "CookingMethod",
      },
    });

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    let filteredRecipes = collection.recipes;

    if (recipeTitle) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(recipeTitle.toLowerCase())
      );
    }

    if (recipeAuthor) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.createdBy.username
          .toLowerCase()
          .includes(recipeAuthor.toLowerCase())
      );
    }

    if (cookingMethods) {
      const selectedCookingMethods = cookingMethods
        .split(",")
        .map((method) => method.trim());

      const cookingMethodIds = await CookingMethod.find({
        name: { $in: selectedCookingMethods },
      }).distinct("_id");

      filteredRecipes = filteredRecipes.filter((recipe) => {
        if (!Array.isArray(recipe.cookingMethods)) {
          return false;
        }

        const matches = cookingMethodIds.some((methodId) =>
          recipe.cookingMethods.some((method) => method._id.equals(methodId))
        );

        return matches;
      });
    }

    // Create an object to hold both the collection name and filtered recipes
    const responseData = {
      collection: collection,
      recipes: filteredRecipes,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// async function getFilteredRecipesForCollection(req, res) {
//   const { slug } = req.params;
//   console.log("slug", slug);
//   //console.log("params", id);
//   //console.log("Query parameters:", req.query);

//   // Inside getFilteredRecipesForMeal function
//   const { recipeTitle, recipeAuthor, cookingMethods } = req.query;
//   //console.log("recipeTitle:", recipeTitle);
//   //console.log("recipeAuthor:", recipeAuthor);

//   // console.log("recipeTitle:", req.query);
//   // console.log("Route hit:", req.url);
//   // console.log("Received parameters:", req.params, req.query);
//   try {
//     const collection = await Collection.findOne({ slug }).populate({
//       path: "recipes",
//       populate: {
//         path: "cookingMethods",
//         model: "CookingMethod", // Should match the 'ref' in the recipeSchema
//       },
//     });

//     // const meal = await Meal.findById(id).populate({
//     //   path: "recipes",
//     //   populate: {
//     //     path: "cookingMethods",
//     //     model: "CookingMethod", // Should match the 'ref' in the recipeSchema
//     //   },
//     // });
//     //console.log("meal", meal);
//     if (!collection) {
//       return res.status(404).json({ error: "collection not found" });
//     }

//     let filteredRecipes = collection.recipes;

//     //console.log("filteredRecipes", filteredRecipes);

//     // If recipeTitle is provided, filter recipes based on recipe title
//     if (recipeTitle) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.title.toLowerCase().includes(recipeTitle.toLowerCase())
//       );
//     }

//     if (recipeAuthor) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.createdBy.username
//           .toLowerCase()
//           .includes(recipeAuthor.toLowerCase())
//       );
//     }

//     if (cookingMethods) {
//       // console.log("cookingMethodsXXX", cookingMethods);
//       const selectedCookingMethods = cookingMethods
//         .split(",")
//         .map((method) => method.trim());

//       //console.log("selectedCookingMethods", selectedCookingMethods);

//       // Retrieve the IDs of cooking methods based on their names
//       const cookingMethodIds = await CookingMethod.find({
//         name: { $in: selectedCookingMethods },
//       }).distinct("_id");
//       //console.log("cookingMethodIds", cookingMethodIds);

//       // Filter recipes based on cooking method IDs
//       filteredRecipes = filteredRecipes.filter((recipe) => {
//         if (!Array.isArray(recipe.cookingMethods)) {
//           // console.log(`Recipe ${recipe.title} has no cooking methods`);
//           return false;
//         }

//         const matches = cookingMethodIds.some((methodId) =>
//           recipe.cookingMethods.some((method) => {
//             // console.log(`Checking method ${method.name} with ID ${method._id}`);
//             return method._id.equals(methodId);
//           })
//         );

//         //console.log(`Recipe ${recipe.title} matches: ${matches}`);

//         return matches;
//       });
//     }

//     // If servings is provided, filter recipes based on servings
//     // if (servings) {
//     //   filteredRecipes = filteredRecipes.filter(
//     //     (recipe) => recipe.servings <= parseInt(servings)
//     //   );
//     // }

//     // If no filters applied, return all recipes
//     // if (!totalTime && !servings) {
//     //   filteredRecipes = meal.recipes;
//     // }
//     // console.log("filteredRecipes", filteredRecipes);
//     // You can add more filters for diets or other criteria if needed
//     console.log("filteredRecipes", filteredRecipes);
//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Get a collection by ID
// async function getCollectionById(req, res) {
//   const { id } = req.params;
//   try {
//     const collection = await Collection.findById(id).populate("recipes");
//     if (!collection) {
//       return res.status(404).json({ error: "Collection not found" });
//     }
//     res.status(200).json(collection);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// async function getCollectionBySlug(req, res) {
//   const { slug } = req.params;
//   console.log("slug", slug);

//   try {
//     const collection = await Collection.findOne({ slug });
//     console.log("collection", collection);
//     if (!collection) {
//       return res.status(404).json({ error: "Collection not found" });
//     }

//     return res.status(200).json(collection);
//   } catch (error) {
//     console.error("Error retrieving collection:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// 65a9b94e8422af81b441c57c
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c?totalTime=240

// Get a meal by ID with optional filtering
// async function getMealById(req, res) {
//   const { id } = req.params;
//   const { totalTime, diets } = req.query;

//   try {
//     const meal = await Meal.findById(id).populate("recipes");

//     if (!meal) {
//       return res.status(404).json({ error: "Meal not found" });
//     }

//     // If cookingTime is provided, filter recipes based on cooking time
//     let filteredRecipes = meal.recipes;
//     if (totalTime) {
//       filteredRecipes = filteredRecipes.filter(
//         (recipe) => recipe.totalTime <= parseInt(totalTime)
//       );
//     }

//     // You can add more filters for diets or other criteria if needed

//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c/recipes?filter[totalTime]=240
// Fetch filtered recipes for a meal
// async function getFilteredRecipesForMeal(req, res) {
//   const { id } = req.params;
//   console.log("rooooutexxxxx", id);
//   const { totalTime, diets } = req.query;

//   try {
//     const meal = await Meal.findById(id).populate("recipes");
//     console.log("mealTESTINGx", meal);
//     if (!meal) {
//       return res.status(404).json({ error: "Meal not found" });
//     }

//     // If cookingTime is provided, filter recipes based on cooking time
//     let filteredRecipes = meal.recipes;
//     if (totalTime) {
//       filteredRecipes = filteredRecipes.filter(
//         (recipe) => recipe.totalTime <= parseInt(totalTime)
//       );
//     }

//     // You can add more filters for diets or other criteria if needed

//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// http://localhost:3000/api/meals/65a9b94e8422af81b441c57c/recipes?filter[totalTime]=240
// Fetch filtered recipes for a meal
// async function getFilteredRecipesForCollection(req, res) {
//   const { id } = req.params;
//   //console.log("params", id);
//   //console.log("Query parameters:", req.query);

//   // Inside getFilteredRecipesForMeal function
//   const { recipeTitle, recipeAuthor, cookingMethods } = req.query;
//   //console.log("recipeTitle:", recipeTitle);
//   //console.log("recipeAuthor:", recipeAuthor);

//   // console.log("recipeTitle:", req.query);
//   // console.log("Route hit:", req.url);
//   // console.log("Received parameters:", req.params, req.query);
//   try {
//     const collection = await Collection.findById(id).populate({
//       path: "recipes",
//       populate: {
//         path: "collections",
//         model: "collection", // Should match the 'ref' in the recipeSchema
//       },
//     });
//     //console.log("meal", meal);
//     if (!collection) {
//       return res.status(404).json({ error: "Collection not found" });
//     }

//     let filteredRecipes = collection.recipes;

//     // If recipeTitle is provided, filter recipes based on recipe title
//     if (recipeTitle) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.title.toLowerCase().includes(recipeTitle.toLowerCase())
//       );
//     }

//     if (recipeAuthor) {
//       filteredRecipes = filteredRecipes.filter((recipe) =>
//         recipe.createdBy.username
//           .toLowerCase()
//           .includes(recipeAuthor.toLowerCase())
//       );
//     }

//     // If cookingMethods is provided, filter recipes based on cooking methods
//     // if (cookingMethods) {
//     //   const selectedCookingMethods = cookingMethods
//     //     .split(",")
//     //     .map((method) => method.trim());
//     //   console.log("Received Cooking Methods:", cookingMethods);
//     //   console.log("Trimmed Methods:", selectedCookingMethods);

//     //   filteredRecipes = filteredRecipes.filter(
//     //     (recipe) =>
//     //       Array.isArray(recipe.cookingMethods) &&
//     //       selectedCookingMethods.every(
//     //         (method) =>
//     //           recipe.cookingMethods.includes &&
//     //           recipe.cookingMethods.includes(method)
//     //       )
//     //   );
//     // }

//     // if (cookingMethods) {
//     //   const selectedCookingMethods = cookingMethods
//     //     .split(",")
//     //     .map((method) => method.trim());

//     //   console.log("selectedCookingMethods", selectedCookingMethods);

//     //   // Retrieve the IDs of cooking methods based on their names
//     //   const cookingMethodIds = await CookingMethod.find({
//     //     name: { $in: selectedCookingMethods },
//     //   }).distinct("_id");
//     //   console.log("cookingMethodIds", cookingMethodIds);

//     //   filteredRecipes = filteredRecipes.filter(
//     //     (recipe) =>
//     //       Array.isArray(recipe.cookingMethods) &&
//     //       cookingMethodIds.every((methodId) =>
//     //         recipe.cookingMethods.includes(methodId.toString())
//     //       )
//     //   );
//     // }

//     if (cookingMethods) {
//       // console.log("cookingMethodsXXX", cookingMethods);
//       const selectedCookingMethods = cookingMethods
//         .split(",")
//         .map((method) => method.trim());

//       //console.log("selectedCookingMethods", selectedCookingMethods);

//       // Retrieve the IDs of cooking methods based on their names
//       const cookingMethodIds = await CookingMethod.find({
//         name: { $in: selectedCookingMethods },
//       }).distinct("_id");
//       //console.log("cookingMethodIds", cookingMethodIds);

//       // Filter recipes based on cooking method IDs
//       filteredRecipes = filteredRecipes.filter((recipe) => {
//         if (!Array.isArray(recipe.cookingMethods)) {
//           // console.log(`Recipe ${recipe.title} has no cooking methods`);
//           return false;
//         }

//         const matches = cookingMethodIds.some((methodId) =>
//           recipe.cookingMethods.some((method) => {
//             // console.log(`Checking method ${method.name} with ID ${method._id}`);
//             return method._id.equals(methodId);
//           })
//         );

//         //console.log(`Recipe ${recipe.title} matches: ${matches}`);

//         return matches;
//       });
//     }

//     // If servings is provided, filter recipes based on servings
//     // if (servings) {
//     //   filteredRecipes = filteredRecipes.filter(
//     //     (recipe) => recipe.servings <= parseInt(servings)
//     //   );
//     // }

//     // If no filters applied, return all recipes
//     // if (!totalTime && !servings) {
//     //   filteredRecipes = meal.recipes;
//     // }
//     // console.log("filteredRecipes", filteredRecipes);
//     // You can add more filters for diets or other criteria if needed

//     res.status(200).json(filteredRecipes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Create a new collection
async function createCollection(req, res) {
  try {
    // Extracting data from the request body
    const { name, description } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Collection instance with name, description, and slug
    const collection = new Collection({
      name,
      description,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Collection to the database
    const savedCollection = await collection.save();

    res.status(201).json(savedCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing collection
async function updateCollection(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Fetch the existing collection
    const existingCollection = await Collection.findById(id);

    if (!existingCollection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Update the name, description, slug, and imageUrl
    const slug = slugify(name, { lower: true });
    const imageUrl = `${slug}.jpg`; // Adjust the path and extension as needed

    // Update the collection in the database
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { name, description, slug, imageUrl },
      { new: true }
    );

    res.status(200).json(updatedCollection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a collection
async function deleteCollection(req, res) {
  const { id } = req.params;

  try {
    await Collection.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getCollections,
  // getCollectionById,
  // getCollectionBySlug,
  getFilteredRecipesForCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
