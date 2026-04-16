import express from "express";
import { authMiddleware } from "#middleware/auth";

const router = express.Router();

const products = [
  { id: 1, name: "Drawing Tablet", price: 8499 },
  { id: 2, name: "Gaming Keyboard", price: 1999 },
  { id: 3, name: "PlayStation 5", price: 50000 },
];

// products
router.get("/products", authMiddleware, (req, res) => {
  const loggedInUser = req.user;

  res.json({
    products,
    user: loggedInUser,
  });
});

export default router;
