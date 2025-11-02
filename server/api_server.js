const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/import-logs', require('./routes/importLogRoutes'));
app.use('/api/jobs', require('./routes/xmlDataRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Job Fetcher API is running!',
    endpoints: {
      importLogs: {
        getAll: 'GET /api/import-logs',
        getById: 'GET /api/import-logs/:id'
      },
      jobs: {
        getAll: 'GET /api/jobs',
        getById: 'GET /api/jobs/:id',
        search: 'GET /api/jobs/search?q=keyword'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler - FIXED: Use a proper path or remove the path entirely
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});