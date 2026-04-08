import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// create a end point for register user
app.post("/register", (req, res) => {
  // Here you would typically handle user registration logic,
  // such as validating input, hashing passwords, and storing user data in a database.
  res.json({ message: "User registration endpoint" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
