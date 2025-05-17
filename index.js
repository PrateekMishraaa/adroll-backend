import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import User from "./routes/User.js";
import Form from "./routes/Contact.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// ✅ CORS Configuration for Vite frontend (localhost:5173)
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // enable cookies, auth headers if needed
};
app.use(cors(corsOptions));

// API Routes
app.use("/api", User);
app.use("/api",Form)
// MongoDB Connection
mongoose.connect(process.env.MONGOURI, {

})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB:", err));

// Test route
app.get("/", (req, res) => {
  console.log("✅ Root route hit");
  res.send("Hello Baba");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
