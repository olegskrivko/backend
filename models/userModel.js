// models/userModel.js
const mongoose = require("mongoose");

// const mealPlanSchema = new mongoose.Schema({
//   day: { type: String, required: true }, // "Monday", "Tuesday", etc.
//   meals: [
//     {
//       time: { type: String, required: true }, // "Breakfast", "Lunch", "Dinner", etc.
//       recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }], // References to recipes
//     },
//   ],
// });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  //firstName: { type: String },
  //lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, default: "user" }, // admin, user, etc.
  // recipesPrepared: {
  //   type: Number,
  //   default: 0,
  // },
  //level: {
  //   type: String,
  //   default: "Kitchen Novice", // Default level for new users
  // },
  // level: {
  //   type: Number,
  //   default: 1,
  // },

  // profilePicture: { type: String }, // URL or image upload
  // bio: { type: String },
  // favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  //preferredCuisine: { type: String },
  // dietaryPreferences: [{ type: String }], // Array of dietary preferences
  //recipesLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  //recipesShared: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  //numberOfFollowers: { type: Number, default: 0 },
  //numberOfFollowing: { type: Number, default: 0 },
  //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  // facebookProfile: { type: String },
  //twitterHandle: { type: String },
  // instagramProfile: { type: String },
  // notificationPreferences: { type: String }, // Can be further detailed based on your needs
  // emailPreferences: { type: String }, // Can be further detailed based on your needs
  // twoFactorAuthentication: { type: Boolean, default: false },
  // country: { type: String },
  //  city: { type: String },
  // dateOfRegistration: { type: Date, default: Date.now },
  // lastLogin: { type: Date },
  //  accountStatus: { type: String, default: "active" }, // active, suspended, etc.
  // passwordResetToken: { type: String },
  tools: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tool" }], // Array of tools available to the user
  // mealPlans: [mealPlanSchema], // Array of meal plans for the week
});

const User = mongoose.model("User", userSchema);

module.exports = User;
