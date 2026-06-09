 
const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require('./config/db');
const authRoutes=require('./routes/auth');
const jobRoutes=require('./routes/job');
const applicationRoutes=require('./routes/application');

const app=express();
connectDB();
app.use(cors());

app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/jobs',jobRoutes);
app.use('/api/applications',applicationRoutes);
app.get('/',(req,res)=>{
    res.send('HireHub API running');

});
const PORT=process.env.PORT||5000;

app.listen(PORT,'0.0.0.0'()=>console.log(`Server running  on port ${PORT}`));