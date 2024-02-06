// models/recipeModel.js
const mongoose = require("mongoose");

// const timeSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   label: { type: String, required: true },
// });

const stepSchema = new mongoose.Schema({
  step: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});
const ingredientSchema = new mongoose.Schema({
  ingredient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ingredient",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  // ingredientPrice: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "IngredientPrice",
  // },
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 250,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["Easy", "Intermediate", "Advanced"],
  },
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
  cuisines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuisine",
    },
  ],
  times: [
    {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
      label: { type: String, required: true },
    },
  ],
  totalTime: { type: Number, default: 0 }, // New field for total time in minutes
  tools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tool",
    },
  ],
  occasions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Occasion",
    },
  ],
  cookingMethods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CookingMethod",
    },
  ],
  instructions: [
    {
      name: {
        type: String,
        required: true,
      },
      steps: [stepSchema],
    },
  ],
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      items: [ingredientSchema],
    },
  ],
  diets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet",
    },
  ],
  servings: {
    type: Number,
    required: true,
    min: 1, // Minimum allowed servings
    max: 10, // Maximum allowed servings
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  tips: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  season: {
    type: [String],
    enum: ["Spring", "Summer", "Autumn", "Winter"],
  },
  tags: {
    type: [String],
    trim: true,
  },
  coverImage: {
    type: String,
    trim: true,
    default: "https://placehold.co/600x400",
  },
  extraImages: {
    type: [String],
    trim: true,
    default: [
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
      "https://placehold.co/600x400",
    ],
  },
  video: {
    type: String,
    trim: true,
    default: "https://placehold.co/1920x1080.mp4",
  },
  variations: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  winePairing: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 250,
  },
  seasonalAvailability: {
    type: String,
    trim: true,
  },
  source: {
    name: {
      type: String,
      trim: true,
      // required: true,
      default: "Unknown", // Default value if not provided
    },
    url: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["book", "internet"], // Enumerated values for source type
      default: "internet", // Default value is set to "internet"
    },
  },
  createdBy: {
    userId: {
      type: String, // You might want to use ObjectId if this is referencing a user model
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
  },
  isSustainable: {
    type: Boolean,
    default: true,
  },
  isHealthy: {
    type: Boolean,
    default: true,
  },
  isPopular: {
    type: Boolean,
    default: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  isAdminModified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

// ingredients: [
//   {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Ingredient",
//   },
// ],
// cookingTime
// pricePerServing
// nutritionFacts
// likes
// score
// dislikes
// comments
// reviews
// similarRecipes
// allergens
// diets

// const instructionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   steps: [stepSchema],
// });

// ingredients: [
//   {
//     ingredient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Ingredient",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     },
//     unit: {
//       type: String,
//       required: true,
//     },
//     ingredientPrice: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "IngredientPrice",
//     },
//   },
// ],
