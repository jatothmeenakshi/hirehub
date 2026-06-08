
const express = require('express');
const router = express.Router();
const { applyToJob, getMyApplications ,updateApplicationStatus,getJobApplications} = require('../controllers/applicationController');
const { protect ,recruiterOnly} = require('../middleware/authMiddleware');

router.post('/:jobId', protect, applyToJob);
router.get('/my', protect, getMyApplications);
router.get('/job/:jobId',protect,recruiterOnly,getJobApplications)
router.patch('/:id/status',protect,recruiterOnly,updateApplicationStatus)

module.exports = router;