const mongoose=require('mongoose');
const applicationSchema=new mongoose.Schema({
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{ timestamps:true});

module.exports=mongoose.model('Application',applicationSchema);