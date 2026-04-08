import express from "express";
// import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// create a end point for register user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body; // { name, email, password }

  // Here you would typically handle user registration logic,
  // such as validating input, hashing passwords, and storing user data in a database.
  res.json({
    message: `User ${name} registered successfully with email ${email}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
