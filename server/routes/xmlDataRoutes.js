const express = require('express');
const {
  getAllJobs,
  getJobById,
  searchJobs
} = require('../controllers/xmlDataController');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/search', searchJobs);
router.get('/:id', getJobById);

module.exports = router;