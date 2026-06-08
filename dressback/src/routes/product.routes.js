const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

console.log("PRODUCT ROUTES LOADED");

const {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProducts);
router.get("/test", (req, res) => {
  res.json({
    message: "test route works",
  });
});
router.get("/:id", getProductById);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);

module.exports = router;