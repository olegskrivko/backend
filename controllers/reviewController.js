// controllers/reviewController.js
const Recipe = require("../models/recipeModel"); // Import your Recipe model or relevant model
const Review = require("../models/reviewModel"); // Import your Review model or relevant model

// Create a new review
// const createReview = async (req, res) => {
//   try {
//     const { id } = req.params; // Get the recipe ID from the URL
//     const {
//       user,
//       taste,
//       visualAppeal,
//       originality,
//       accuracy,
//       availability,
//       preparation,
//       makeAgain,
//       reviewText,
//     } = req.body; // Assuming your review has these fields
//     //const { user, rating, sliders, questions, reviewText } = req.body; // Assuming your review has these fields
//     // const data = req.body;
//     // need to get user id too?
//     console.log("user", user);
//     console.log("id", id);
//     console.log("req.body", req.body);
//     // Find the recipe by ID
//     const recipe = await Recipe.findById(id);

//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     // Create a new review
// const newReview = new Review({
//   user,
//   ratings: {
//     taste,
//     visualAppeal,
//     originality,
//     accuracyOfInstructions: accuracy, // Renamed to match the schema
//     availabilityOfIngredients: availability, // Renamed to match the schema
//     difficulty: preparation, // Renamed to match the schema
//   },
//   questions: {
//     prepareRecipe: makeAgain === "Yes", // Convert "Yes" to true, "No" to false
//   },
//   // rating,
//   // sliders,
//   // questions,
//   text: reviewText,
//   recipe: id,
// });

//     // Save the review to the database
//     await newReview.save();

//     // Update the recipe's reviews array
//     recipe.reviews.push(newReview._id);
//     await recipe.save();

//     return res.status(201).json(newReview);
//   } catch (error) {
//     console.error("Error creating review:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const createOrUpdateReview = async (req, res) => {
  try {
    const { id } = req.params; // Get the recipe ID from the URL
    const {
      user,
      taste,
      visualAppeal,
      originality,
      accuracy,
      availability,
      preparation,
      makeAgain,
      reviewText,
    } = req.body;
    console.log("req.body", req.body);
    // Check if a review already exists for this user and recipe
    const existingReview = await Review.findOne({ user, recipe: id });
    console.log("rexistingReview", existingReview);
    if (existingReview) {
      // Update the existing review
      existingReview.ratings.taste = taste;
      existingReview.ratings.visualAppeal = visualAppeal;
      existingReview.ratings.originality = originality;
      existingReview.ratings.accuracyOfInstructions = accuracy; // Renamed to match the schema
      existingReview.ratings.availabilityOfIngredients = availability; // Renamed to match the schema
      existingReview.ratings.difficulty = preparation; // Renamed to match the schema
      existingReview.questions.prepareRecipe = makeAgain === "Yes"; // Convert "Yes" to true, "No" to false
      existingReview.text = reviewText;
      await existingReview.save();

      return res.status(200).json(existingReview);
    } else {
      // Create a new review
      // const newReview = new Review({
      //   user,
      //   taste,
      //   visualAppeal,
      //   originality,
      //   accuracy,
      //   availability,
      //   preparation,
      //   makeAgain,
      //   reviewText,
      //   recipe: id,
      // });

      const newReview = new Review({
        user,
        ratings: {
          taste,
          visualAppeal,
          originality,
          accuracyOfInstructions: accuracy, // Renamed to match the schema
          availabilityOfIngredients: availability, // Renamed to match the schema
          difficulty: preparation, // Renamed to match the schema
        },
        questions: {
          prepareRecipe: makeAgain === "Yes", // Convert "Yes" to true, "No" to false
        },
        // rating,
        // sliders,
        // questions,
        text: reviewText,
        recipe: id,
      });

      await newReview.save();

      return res.status(201).json(newReview);
    }
  } catch (error) {
    console.error("Error creating or updating review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get reviews for a specific recipe
// const getRecipeReviews = async (req, res) => {
//   try {
//     const { id } = req.params; // Get the recipe ID from the URL
//     console.log("recipes id for");
//     // Find the recipe by ID with its populated reviews
//     // const recipe = await Recipe.findById(id).populate("reviews");
//     // Find the recipe by ID with its populated reviews
//     const recipe = await Recipe.findById(id).populate({
//       path: "reviews",
//       populate: {
//         path: "user",
//         model: "User",
//         select: "username email", // Add the fields you want to include
//       },
//     });

//     if (!recipe) {
//       return res.status(404).json({ error: "Recipe not found" });
//     }

//     return res.status(200).json(recipe.reviews);
//   } catch (error) {
//     console.error("Error getting recipe reviews:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getRecipeReviews = async (req, res) => {
  try {
    const { id } = req.params; // Get the recipe ID from the URL
    console.log("Recipe ID for reviews:", id);

    // Find all reviews with the specified recipe ID
    const reviews = await Review.find({ recipe: id })
      .populate("user", "username email")
      .exec();

    if (!reviews) {
      return res
        .status(404)
        .json({ error: "No reviews found for this recipe" });
    }

    // Initialize variables to store the total and count for each rating aspect
    let totalTaste = 0;
    let totalAccuracyOfInstructions = 0;
    // let totalOriginality = 0;
    let totalVisualAppeal = 0;
    let totalAvailabilityOfIngredients = 0;
    let totalDifficulty = 0;
    let count = 0;

    // Iterate through each review and sum up the ratings
    reviews.forEach((review) => {
      totalTaste += review.ratings.taste;
      totalAccuracyOfInstructions += review.ratings.accuracyOfInstructions;
      // totalOriginality += review.ratings.originality;
      totalVisualAppeal += review.ratings.visualAppeal;
      totalAvailabilityOfIngredients +=
        review.ratings.availabilityOfIngredients;
      totalDifficulty += review.ratings.difficulty;
      count++;
    });

    // Calculate the average ratings
    const averageTaste = totalTaste / count;
    const averageAccuracyOfInstructions = totalAccuracyOfInstructions / count;
    // const averageOriginality = totalOriginality / count;
    const averageVisualAppeal = totalVisualAppeal / count;
    const averageAvailabilityOfIngredients =
      totalAvailabilityOfIngredients / count;
    const averageDifficulty = totalDifficulty / count;

    // Calculate the total score based on the average of all ratings
    const totalScore =
      (averageTaste +
        averageAccuracyOfInstructions +
        // averageOriginality +
        averageVisualAppeal +
        averageAvailabilityOfIngredients +
        averageDifficulty) /
      5;

    // Append the average ratings to the response
    const response = {
      reviews,
      aggregateRatings: {
        averageTaste: averageTaste || 0,
        averageAccuracyOfInstructions: averageAccuracyOfInstructions || 0,
        // averageOriginality: averageOriginality || 0,
        averageVisualAppeal: averageVisualAppeal || 0,
        averageAvailabilityOfIngredients: averageAvailabilityOfIngredients || 0,
        averageDifficulty: averageDifficulty || 0,
        totalScore: (totalScore || 0).toFixed(1),
        reviewCount: count || 0,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error getting reviews by recipe ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a review
// const updateReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params; // Get the review ID from the URL
//     const { user, rating, sliders, questions, text } = req.body; // Assuming your review has these fields

//     // Find the review by ID
//     const review = await Review.findById(reviewId);

//     if (!review) {
//       return res.status(404).json({ error: "Review not found" });
//     }

//     // Update the review fields
//     review.user = user;
//     review.rating = rating;
//     review.sliders = sliders;
//     review.questions = questions;
//     review.text = text;

//     // Save the updated review to the database
//     await review.save();

//     return res.status(200).json(review);
//   } catch (error) {
//     console.error("Error updating review:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params; // Get the review ID from the URL

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Find the associated recipe
    const recipe = await Recipe.findById(review.recipe);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Remove the review from the recipe's reviews array
    recipe.reviews = recipe.reviews.filter(
      (r) => r.toString() !== review._id.toString()
    );
    await recipe.save();

    // Delete the review from the database
    await review.remove();

    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports = { createReview, getRecipeReviews, updateReview, deleteReview };
module.exports = { createOrUpdateReview, getRecipeReviews, deleteReview };
