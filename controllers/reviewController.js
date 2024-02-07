// controllers/reviewController.js
const Recipe = require("../models/recipeModel"); // Import your Recipe model or relevant model
const Review = require("../models/reviewModel"); // Import your Review model or relevant model

// Create a new review
const createReview = async (req, res) => {
  try {
    const { id } = req.params; // Get the recipe ID from the URL
    const { user, reviewText } = req.body; // Assuming your review has these fields
    //const { user, rating, sliders, questions, reviewText } = req.body; // Assuming your review has these fields
    // const data = req.body;
    // need to get user id too?
    console.log("user", user);
    console.log("id", id);
    console.log("req.body", req.body);
    // Find the recipe by ID
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Create a new review
    const newReview = new Review({
      user,
      // rating,
      // sliders,
      // questions,
      text: reviewText,
      recipe: id,
    });

    // Save the review to the database
    await newReview.save();

    // Update the recipe's reviews array
    recipe.reviews.push(newReview._id);
    await recipe.save();

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get reviews for a specific recipe
const getRecipeReviews = async (req, res) => {
  try {
    const { id } = req.params; // Get the recipe ID from the URL

    // Find the recipe by ID with its populated reviews
    // const recipe = await Recipe.findById(id).populate("reviews");
    // Find the recipe by ID with its populated reviews
    const recipe = await Recipe.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "username email", // Add the fields you want to include
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    return res.status(200).json(recipe.reviews);
  } catch (error) {
    console.error("Error getting recipe reviews:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params; // Get the review ID from the URL
    const { user, rating, sliders, questions, text } = req.body; // Assuming your review has these fields

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the review fields
    review.user = user;
    review.rating = rating;
    review.sliders = sliders;
    review.questions = questions;
    review.text = text;

    // Save the updated review to the database
    await review.save();

    return res.status(200).json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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

module.exports = { createReview, getRecipeReviews, updateReview, deleteReview };
