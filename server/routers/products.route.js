import express from "express";
import { authMiddleware } from "#middleware/auth";
import { getProducts } from "#controllers/productController";

const router = express.Router();

// products
router.get("/products", authMiddleware, getProducts);

export default router;
