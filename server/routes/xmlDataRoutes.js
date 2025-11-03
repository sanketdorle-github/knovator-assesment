import express from "express";
import {
  getAllJobs,
  getJobById,
  searchJobs,
} from "../controllers/xmlDataController.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/search", searchJobs);
router.get("/:id", getJobById);

export default router;
