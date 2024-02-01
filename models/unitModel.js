// models/unitModel.js
const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  abbreviation: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 10,
  },
  isBaseUnit: {
    type: Boolean,
    required: true,
    default: false,
  },
  // conversionFactor: {
  //   type: Number,
  //   default: 1, // Conversion factor relative to the base unit
  // },
  system: {
    type: String,
    enum: ["Metric", "Imperial"],
    required: true,
    trim: true,
  },
});

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
