require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // Add this import
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const noticeRoutes = require("./routes/notices");

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from the frontend
  })
);

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/admin", adminRoutes); // Use a different path for admin routes
app.use("/notices", noticeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
