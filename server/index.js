import express from "express";
// import cors from "cors";
import "#utils/loadEnvironment";
import apiRouter from "#routers/index.route";
import "#db/connection";
import fs from "fs";
import path from "path";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

const uploadsDir = path.join(import.meta.dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-Rate-Limit-*` headers
});

limiter.resetKey("::ffff:");

// Apply the rate limiter to all requests
app.use(limiter);

/// Routers
app.use("/", apiRouter);

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
