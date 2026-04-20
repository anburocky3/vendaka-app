import express from "express";
import { authMiddleware } from "#middleware/auth";
import { manageProducts } from "#controllers/adminController";
import { requireAdmin } from "#middleware/admin";

const router = express.Router();

// products // http://localhost:3000/api/admin/manage-products
router.get("/manage-products", requireAdmin, manageProducts);

export default router;
