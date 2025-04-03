// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/userRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentSchoolsRoutes = require("./routes/departmentSchoolRoutes");
const authRoutes = require("./dev-data/tokens/generateGoogleTokens");
const noticeRoutes = require("./routes/noticeRoutes");
const programRoutes = require("./routes/programRoutes.js");

const connectDB = require("./config/db");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to Database
connectDB();

//run cron service
require("./services/archiveCron.js");

// Routes
app.use("/api/", routes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/departmentSchools", departmentSchoolsRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/notice", noticeRoutes);
app.use("/api/v1/program", programRoutes);

app.use("/auth", authRoutes);

app.all("*", (req, resp, next) => {
  next(new AppError(`cannot find path ${req.originalUrl}`, 400));
});
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
