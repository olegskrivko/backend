// routes/toolRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateTool,
  validateUpdateTool,
} = require("../middleware/validations/toolValidation");
const toolController = require("../controllers/toolController");

// Get all tools
router.get("/", toolController.getTools);

// Create a new tool
router.post(
  "/",
  validateCreateTool,
  validateRequest,
  toolController.createTool
);

// Update an existing tool
router.put(
  "/:id",
  validateUpdateTool,
  validateRequest,
  toolController.updateTool
);

// Delete a tool
router.delete("/:id", toolController.deleteTool);

module.exports = router;
