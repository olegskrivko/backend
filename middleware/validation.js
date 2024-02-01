// middlewares/validation.js
const { body, validationResult } = require("express-validator");

// Generic validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  validateRequest,
};
