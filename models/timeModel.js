const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  name: String,
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
