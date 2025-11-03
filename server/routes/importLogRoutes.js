import express from "express";
import {
  getAllImportLogs,
  getImportLogById,
} from "../controllers/importLogController.js";

const router = express.Router();

router.get("/", getAllImportLogs);
router.get("/:id", getImportLogById);

export default router;
