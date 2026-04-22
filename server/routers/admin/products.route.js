import express from "express";
import { authMiddleware } from "#middleware/auth";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "#controllers/adminController";
import { requireAdmin } from "#middleware/admin";
import multer from "multer";
import path from "path";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    // Generate a unique name + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
}); // Limit file size to 5MB

const router = express.Router();

router.use(authMiddleware, requireAdmin);

// Create -> POST /api/admin/products
// READ -> GET /api/admin/products
// UPDATE -> PUT /api/admin/products/:id
// DELETE -> DELETE /api/admin/products/:id

// products // http://localhost:3000/api/admin/products
router.post("/products", upload.single("productImage"), createProduct); // CREATE
router.get("/products", getProducts); // READ
router.get("/products/:id", getProductById); // READ single product
router.put("/products/:id", upload.single("productImage"), updateProduct); // UPDATE
router.delete("/products/:id", deleteProduct); // DELETE

export default router;
