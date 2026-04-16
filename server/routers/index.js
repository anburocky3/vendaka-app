import express from "express";
import authRouter from "#routers/auth";
import productRouter from "#routers/products";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

router.use("/", authRouter);

router.use("/", productRouter);

export default router;
