const Application=require('../models/Application');
const Job = require('../models/Job');
const job=require('../models/Job');

const applyToJob=async(req,res)=>{
    try {
        const job=await Job.findById(req.params.jobId);
        if(!job){
            return res.status(404).json ({ message:'Job not found'});
        }
        const alreadyApplied=await Application.findOne({
            jobId:req.params.jobId,
            userId:req.user.id
        });
        if(alreadyApplied){
            return res.status(400).json({message:'Already applied to this job'});
        }
        const application =await Application.create({
            jobId:req.params.jobId,
            userId:req.user.id
        });
        res.status(201).json(application);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId', 'title company location');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['accepted', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )

    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    res.status(200).json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

const getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email')
      .populate('jobId', 'title company')
    res.status(200).json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { applyToJob, getMyApplications, updateApplicationStatus ,getJobApplications}


