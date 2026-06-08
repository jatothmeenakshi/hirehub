const jwt=require('jsonwebtoken');
const protect=(req,res,next)=>{
     console.log('Auth header:',req.headers.authorization);
    const authHeader=req.headers.authorization;
   
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'No token, unauthorized'});
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch(error){
        res.status(401).json({message:'Invalid token'});
    }
};
const recruiterOnly=(req,res,next)=>{
    if(req.user.role!=='recruiter'){
        return res.status(403).json({message:'Access denied. recruiters only.'});

    }
    next();
};

module.exports={protect,recruiterOnly};