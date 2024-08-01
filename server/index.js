import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { check, validationResult } from "express-validator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://adrianyumnam:p6UBZQPrHtczx6vr@cluster0.ry7aant.mongodb.net/Dtunes?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Registration Route
app.post(
  "/api/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("Inside src/index", errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      await user.save();

      const payload = { user: { id: user.id } };
      console.log("payload", payload);
      console.log("JWT_SECRET", process.env.JWT_SECRET);
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// Login Route
app.post(
  "/api/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// Route to search YouTube
app.get("/api/search", async (req, res) => {
  const { query } = req.query; // Get the search query from the request

  try {
    // Make a request to the YouTube Data API
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          key: "AIzaSyAWT2J3lmYzUi-MCXI7oRE1_WjIOpGRMaE",
          type: "video",
          videoCategoryId: "10", // Ensure we are searching for videos
          maxResults: 10, // Limit the number of results
        },
      }
    );
    console.log("Response from YouTube API:", response.data);
    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from YouTube API" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
