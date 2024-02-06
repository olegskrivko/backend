// routes/reviewRoutes.js
const express = require("express");
const router = express.Router({ mergeParams: true });
const recipeRoutes = require("./recipeRoutes"); // Import the recipe router

const {
  authenticateToken,
  isAuthenticated,
  isReviewOwner,
} = require("../middleware/authMiddleware");

// const {
//   createReview,
//   getRecipeReviews,
//   updateReview,
//   deleteReview,
// } = require("../controllers/reviewController");

const reviewController = require("../controllers/reviewController");

router.post(
  "/",
  authenticateToken,
  isAuthenticated,
  reviewController.createReview
);
router.get("/", reviewController.getRecipeReviews);
router.put(
  "/:reviewId",
  authenticateToken,
  isAuthenticated,
  reviewController.updateReview
);
router.delete(
  "/:reviewId",
  authenticateToken,
  isAuthenticated,
  reviewController.deleteReview
);

module.exports = router;
