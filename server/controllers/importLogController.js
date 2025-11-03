import ImportLog from "../models/ImportLog.js";

// @desc    Get all import logs with pagination and sorting
// @route   GET /api/import-logs
// @access  Public
const getAllImportLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "timestamp";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const logs = await ImportLog.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const total = await ImportLog.countDocuments();

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      message: "Import logs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// @desc    Get single import log by ID
// @route   GET /api/import-logs/:id
// @access  Public
const getImportLogById = async (req, res) => {
  try {
    const log = await ImportLog.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Import log not found",
      });
    }

    res.status(200).json({
      success: true,
      data: log,
      message: "Import log fetched successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid import log ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export { getAllImportLogs, getImportLogById };
