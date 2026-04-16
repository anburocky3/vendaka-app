import express from "express";
import authRouter from "./auth.js";
import productRouter from "./products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

router.use("/", authRouter);

router.use("/", productRouter);

export default router;
