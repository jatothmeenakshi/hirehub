const express=require('express');
const router=express.Router();
const {createJob,getAllJobs,getJobById,deleteJob,getMyJobs}=require('../controllers/jobController');
const {protect,recruiterOnly}=require('../middleware/authMiddleware');
router.post('/',protect,recruiterOnly,createJob);
router.get('/',getAllJobs);
router.get('/my',protect,recruiterOnly,getMyJobs)
router.get('/:id',getJobById);
router.delete('/:id',protect,recruiterOnly,deleteJob);


module.exports=router;