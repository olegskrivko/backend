// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      maxlength: 500,
      // required: true,
    },
    questions: {
      prepareRecipe: {
        type: Boolean,
        //   required: true,
      },
      prepareAgain: {
        type: Boolean,
        //   required: true,
      },
      // clearInstructions: {
      //   type: Boolean,
      //   required: true,
      // },
    },
    sliders: {
      taste: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
      accuracyOfInstructions: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
      originality: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
      visualAppeal: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
      availabilityOfIngredients: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
      difficulty: {
        type: Number,
        min: 0,
        max: 10,
        //   required: true,
      },
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure that a user can only submit one review per recipe
// reviewSchema.index({ user: 1, recipe: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
