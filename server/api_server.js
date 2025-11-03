import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import importLogRoutes from "./routes/importLogRoutes.js";
import xmlDataRoutes from "./routes/xmlDataRoutes.js";

// Load env vars
dotenv.config({ path: "./.env" });
// console.log(process.env.MONGO_URI);

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/import-logs", importLogRoutes);
app.use("/api/jobs", xmlDataRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Fetcher API is running!",
    endpoints: {
      importLogs: {
        getAll: "GET /api/import-logs",
        getById: "GET /api/import-logs/:id",
      },
      jobs: {
        getAll: "GET /api/jobs",
        getById: "GET /api/jobs/:id",
        search: "GET /api/jobs/search?q=keyword",
      },
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
