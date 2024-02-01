// routes/occasionRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateOccasion,
  validateUpdateOccasion,
} = require("../middleware/validations/occasionValidation");
const occasionController = require("../controllers/occasionController");

// Get all occasions
router.get("/", occasionController.getOccasions);

// Create a new occasion
router.post(
  "/",
  validateCreateOccasion,
  validateRequest,
  occasionController.createOccasion
);

// Update an existing occasion
router.put(
  "/:id",
  validateUpdateOccasion,
  validateRequest,
  occasionController.updateOccasion
);

// Delete a occasion
router.delete("/:id", occasionController.deleteOccasion);

module.exports = router;
