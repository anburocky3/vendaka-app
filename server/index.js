import express from "express";
// import cors from "cors";
import "./utils/loadEnvironment.js";
import apiRouter from "./routers/index.js";

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());

/// Routers
app.use("/", apiRouter);

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
