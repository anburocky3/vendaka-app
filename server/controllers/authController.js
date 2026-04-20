import User from "#models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function registerUser(req, res) {
  const { name, email, password } = req.validatedBody; // { name, email, password }

  try {
    // await db.collection("users").inse4rtOne({
    //   name,
    //   email,
    //   password: bcrypt.hashSync(password, 10),
    // });

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await user.save();

    res.json({
      message: `User ${name} registered successfully with email ${email}`,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.validatedBody; // { email, password }

  try {
    // const user = await db.collection("users").findOne({ email });
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // i have that user info!
    const token = jwt.sign(
      { id: user._id, role: user.role },
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
}

export async function getCurrentUser(req, res) {
  const loggedInUser = req.user;

  if (loggedInUser.role === "admin") {
    console.log("Admin user logged in:", loggedInUser);
  } else {
    console.log("Regular user logged in:", loggedInUser);
  }

  console.log("Logged in user from /me endpoint:", loggedInUser);

  try {
    const user = await User.findOne(
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
}

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};
