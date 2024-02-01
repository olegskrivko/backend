// controllers/toolController.js
const slugify = require("slugify");
const Tool = require("../models/toolModel");

// Get all tools
async function getTools(req, res) {
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new tool
async function createTool(req, res) {
  try {
    // Extracting data from the request body
    const { name, category, shopName, purchaseLink } = req.body;

    // Set the slug based on the name
    const slug = slugify(name, { lower: true });

    // Creating a new Tool instance with name, category, purchaseLink and slug
    const tool = new Tool({
      name,
      category,
      shopName,
      purchaseLink,
      slug,
      imageUrl: `${slug}.jpg`, // Adjust the path and extension as needed
    });

    // Saving the new Tool to the database
    const savedTool = await tool.save();

    res.status(201).json(savedTool);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update an existing tool
async function updateTool(req, res) {
  const { id } = req.params;
  const { name, category, shopName, purchaseLink } = req.body;

  try {
    const updatedTool = await Tool.findByIdAndUpdate(
      id,
      { name, category, shopName, purchaseLink },
      { new: true }
    );
    res.status(200).json(updatedTool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a tool
async function deleteTool(req, res) {
  const { id } = req.params;

  try {
    await Tool.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getTools,
  createTool,
  updateTool,
  deleteTool,
};
