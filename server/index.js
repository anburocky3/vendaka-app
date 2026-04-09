import express from "express";
// import cors from "cors";
import "./utils/loadEnvironment.js";
import db from "./db/connection.js";
import bcrypt from "bcrypt";
const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// for testing the database connection
app.get("/movies", async (req, res) => {
  try {
    const movies = await db.collection("movies").find().toArray();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// create a end point for register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body; // { name, email, password }

  // do some basic validation
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: bcrypt.hashSync(password, 10) });

    res.json({
      message: `User ${name} registered successfully with email ${email}`,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
