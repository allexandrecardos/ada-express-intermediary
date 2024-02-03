// routes/users.js

const express = require("express");
const ProductController = require("../controllers/ProductController");
const  upload  = require("../filesystem/filesystem");

const router = express.Router();

const productController = new ProductController()

router.post("/", upload.single('file'), productController.createProduct);

router.get("/", productController.getAllProducts);

// router.get("/:id", productController.getProductById);

router.get("/:category/:id?", productController.getProductByQuery);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;