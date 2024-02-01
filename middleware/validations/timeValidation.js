// middleware/validations/timeValidation.js
const { body } = require("express-validator");
const Time = require("../../models/timeModel");

const validateCreateTime = [];

const validateUpdateTime = [];

module.exports = {
  validateCreateTime,
  validateUpdateTime,
};
