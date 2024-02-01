// controllers/unitController.js
const Unit = require("../models/unitModel");

// Get all units
async function getUnits(req, res) {
  try {
    const units = await Unit.find();
    res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new unit
async function createUnit(req, res) {
  try {
    // Extracting data from the request body
    const { name, abbreviation, isBaseUnit, conversionFactor, system } =
      req.body;

    // Creating a new Unit instance with name, abbreviation, isBaseUnit, conversionFactor and system
    const unit = new Unit({
      name,
      abbreviation,
      isBaseUnit,
      conversionFactor,
      system,
    });

    // Saving the new Unit to the database
    const savedUnit = await unit.save();

    res.status(201).json(savedUnit);
  } catch (error) {
    console.error("Error creating unit:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing unit
async function updateUnit(req, res) {
  const { id } = req.params;
  const { name, abbreviation, isBaseUnit, conversionFactor, system } = req.body;

  try {
    // Fetch the existing unit
    const existingUnit = await Unit.findById(id);

    if (!existingUnit) {
      return res.status(404).json({ error: "Unit not found" });
    }

    // Update the unit in the database
    const updatedUnit = await Unit.findByIdAndUpdate(
      id,
      { name, abbreviation, isBaseUnit, conversionFactor, system },
      { new: true }
    );

    res.status(200).json(updatedUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a unit
async function deleteUnit(req, res) {
  const { id } = req.params;

  try {
    await Unit.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUnits,
  createUnit,
  updateUnit,
  deleteUnit,
};
