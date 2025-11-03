import XmlData from "../models/XmlData.js";

// @desc    Get all jobs with filtering and pagination
// @route   GET /api/jobs
// @access  Public
const getAllJobs = async (req, res) => {
  try {
    const { company, location, type, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (company) filter.company = new RegExp(company, "i");
    if (location) filter.location = new RegExp(location, "i");
    if (type) filter.type = new RegExp(type, "i");

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const jobs = await XmlData.find(filter)
      .sort({ imported_at: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await XmlData.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      message: "Jobs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await XmlData.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
      message: "Job fetched successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// @desc    Search jobs by title or description
// @route   GET /api/jobs/search
// @access  Public
const searchJobs = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query parameter "q" is required',
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Text search on title and description
    const jobs = await XmlData.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limitNum);

    const total = await XmlData.countDocuments({ $text: { $search: q } });

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
      message: "Search completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export { getAllJobs, getJobById, searchJobs };
