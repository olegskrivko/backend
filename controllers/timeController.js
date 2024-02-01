// controllers/timeController.js
const Time = require("../models/timeModel");

// Get all times
async function getTimes(req, res) {
  try {
    const times = await Time.find();
    res.status(200).json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new time
async function createTime(req, res) {
  try {
    // Extracting data from the request body
    const { name } = req.body;

    // Creating a new Time instance with label and value
    const time = new Time({
      name,
    });

    // Saving the new Time to the database
    const savedTime = await time.save();

    res.status(201).json(savedTime);
  } catch (error) {
    console.error("Error creating time:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing time
async function updateTime(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    // Fetch the existing time
    const existingTime = await Time.findById(id);

    if (!existingTime) {
      return res.status(404).json({ error: "Time not found" });
    }

    // Update the time in the database
    const updatedTime = await Time.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.status(200).json(updatedTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a time
async function deleteTime(req, res) {
  const { id } = req.params;

  try {
    await Time.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getTimes,
  createTime,
  updateTime,
  deleteTime,
};
