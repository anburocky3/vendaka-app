import express from "express";
// import cors from "cors";
import "#utils/loadEnvironment";
import apiRouter from "#routers/index.route";
import "#db/connection";
import path from "path";

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

/// Routers
app.use("/", apiRouter);

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
