// routes/unitRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateUnit,
  validateUpdateUnit,
} = require("../middleware/validations/unitValidation");
const unitController = require("../controllers/unitController");

// Get all units
router.get("/", unitController.getUnits);

// Create a new unit
router.post(
  "/",
  validateCreateUnit,
  validateRequest,
  unitController.createUnit
);

// Update an existing unit
router.put(
  "/:id",
  validateUpdateUnit,
  validateRequest,
  unitController.updateUnit
);

// Delete a unit
router.delete("/:id", unitController.deleteUnit);

module.exports = router;
