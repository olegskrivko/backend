// models/shopModel.js
const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  contact: {
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  openingHours: {
    type: String,
    trim: true,
  },
  // Add other fields related to a shop as needed
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
// NOT DONE
