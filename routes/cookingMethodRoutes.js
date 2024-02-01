// routes/cookingMethodRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateCookingMethod,
  validateUpdateCookingMethod,
} = require("../middleware/validations/cookingMethodValidation");
const CookingMethodController = require("../controllers/cookingMethodController");

// Get all cookingMethods
router.get("/", CookingMethodController.getCookingMethods);

// Create a new cookingMethod
router.post(
  "/",
  validateCreateCookingMethod,
  validateRequest,
  CookingMethodController.createCookingMethod
);

// Update an existing cookingMethod
router.put(
  "/:id",
  validateUpdateCookingMethod,
  validateRequest,
  CookingMethodController.updateCookingMethod
);

// Delete a cookingMethod
router.delete("/:id", CookingMethodController.deleteCookingMethod);

module.exports = router;
