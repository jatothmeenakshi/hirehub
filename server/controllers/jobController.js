const Job=require('../models/Job');
 const createJob=async(req,res)=>{
    try{
        const {title,company,location,salary,description}=req.body;
        const job=await Job.create({
            title,company,location,salary,description,postedBy:req.user.id 
        });
        res.status(201).json(job);
    }catch(error){
        res.status(500).json({message:error.message});
        }
 };
 
 const getAllJobs=async(req,res)=>{
    try{
        const jobs=await Job.find().populate('postedBy','name email');
        res.status(200).json(jobs);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getJobById=async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id).populate('postedBy','name email');
        if(!job){
            return res.status(404).json({message:'Job not found'});

        }
        res.status(200).json(job);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const deleteJob=async(req,res)=>{
    try{
        const job=await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({message:'Job not found'});

        }
        if(job.postedBy.toString()!==req.user.id){
            return res.status(403).json({message:'Not authorized to delete this job'});
        }
        await job.deleteOne();
        res.status(200).json({message:'Job deleted'});
       
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id })
    res.status(200).json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports={createJob,getAllJobs,getJobById,deleteJob,getMyJobs};