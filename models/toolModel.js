// models/toolModel.js
const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  category: {
    type: String,
    enum: [
      "Cookware",
      "Cutlery",
      "Bakeware",
      "Utensils",
      "Appliances",
      "Kitchen Gadgets",
      "Other",
    ],
    default: "Other",
    required: true,
  },
  shopName: {
    type: String, // Add a field to store the shop name
    trim: true,
  },
  purchaseLink: {
    type: String, // Assuming the link is a URL
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

const Tool = mongoose.model("Tool", toolSchema);

module.exports = Tool;
