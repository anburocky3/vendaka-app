import express from "express";
import { authMiddleware } from "#middleware/auth";
import { getProducts } from "#controllers/productController";

const router = express.Router();

// products // http://localhost:3000/api/products
router.get("/products", authMiddleware, getProducts);

export default router;
