// routes/dietRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateDiet,
  validateUpdateDiet,
} = require("../middleware/validations/dietValidation");
const dietController = require("../controllers/dietController");

// Get all diets
router.get("/", dietController.getDiets);

// Create a new diet
router.post(
  "/",
  validateCreateDiet,
  validateRequest,
  dietController.createDiet
);

// Update an existing diet
router.put(
  "/:id",
  validateUpdateDiet,
  validateRequest,
  dietController.updateDiet
);

// Delete a diet
router.delete("/:id", dietController.deleteDiet);

module.exports = router;
