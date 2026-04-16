import express from "express";
import validateBody from "../middleware/zod-validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";
import { authMiddleware } from "../middleware/auth.js";
import db from "../db/connection.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

const router = express.Router();

// create a end point for register user
router.post("/register", validateBody(registerSchema), async (req, res) => {
  const { name, email, password } = req.validatedBody; // { name, email, password }

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

router.post("/login", validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.validatedBody; // { email, password }

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

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      sameSite: "Lax",
      path: "/",
    });

    res.json({ message: `User ${user.name} logged in successfully`, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ error: "Failed to login user", errorMessage: error.message });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const loggedInUser = req.user;

  console.log("Logged in user from /me endpoint:", loggedInUser);

  try {
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(loggedInUser.id) },
        { projection: { password: 0 } },
      );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
});

export default router;
