// routes/timeRoutes.js
const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware/validation");
const {
  validateCreateTime,
  validateUpdateTime,
} = require("../middleware/validations/timeValidation");
const timeController = require("../controllers/timeController");

// Get all times
router.get("/", timeController.getTimes);

// Create a new time
router.post(
  "/",
  validateCreateTime,
  validateRequest,
  timeController.createTime
);

// Update an existing time
router.put(
  "/:id",
  validateUpdateTime,
  validateRequest,
  timeController.updateTime
);

// Delete a time
router.delete("/:id", timeController.deleteTime);

module.exports = router;
