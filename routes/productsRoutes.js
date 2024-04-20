// // routes/productsRoutes.js
// const express = require("express");
// const router = express.Router();
// const { validateRequest } = require("../middleware/validation");
// const {
//   validateCreateProduct,
//   validateUpdateProduct,
// } = require("../middleware/validations/productValidation");
// const productController = require("../controllers/productController");

// // Get all products
// router.get("/", productController.getProducts);

// // Create a new product
// router.post(
//   "/",
//   validateCreateProduct,
//   validateRequest,
//   productController.createProduct
// );

// // Update an existing product
// router.put(
//   "/:id",
//   validateUpdateProduct,
//   validateRequest,
//   productController.updateProduct
// );

// // Delete a product
// router.delete("/:id", productController.deleteProduct);

// module.exports = router;
