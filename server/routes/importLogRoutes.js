const express = require('express');
const {
  getAllImportLogs,
  getImportLogById
} = require('../controllers/importLogController');

const router = express.Router();

router.get('/', getAllImportLogs);
router.get('/:id', getImportLogById);

module.exports = router;