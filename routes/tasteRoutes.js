// routes/tasteRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateTaste,
  validateUpdateTaste,
} = require("../middleware/validations/tasteValidation");
const tasteController = require("../controllers/tasteController");

// Get all tastes
router.get("/", tasteController.getTastes);

// Create a new taste
router.post(
  "/",
  validateCreateTaste,
  validateRequest,
  tasteController.createTaste
);

// Update an existing taste
router.put(
  "/:id",
  validateUpdateTaste,
  validateRequest,
  tasteController.updateTaste
);

// Delete a taste
router.delete("/:id", tasteController.deleteTaste);

module.exports = router;
