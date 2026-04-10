import express from "express";
// import cors from "cors";
import "./utils/loadEnvironment.js";
import db from "./db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware/auth.js";

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
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

// create a end point for login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body; // { email, password }

  // do some basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // i have that user info!
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({ message: `User ${user.name} logged in successfully`, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ error: "Failed to login user", errorMessage: error.message });
  }
});

// protected route example
app.get("/services", authMiddleware, (req, res) => {
  const loggedInUser = req.user;

  res.json({
    services: ["Service 1", "Service 2", "Service 3"],
    user: loggedInUser,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
