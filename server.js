// server.js

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./config/dbConn');
app.use('/public', express.static('public'));
app.use(express.json({ limit: '5gb' }));

const employeeRouter = require('./router/EmployeeRouter');
const RecRouter = require('./router/RecruitmentRouter');
const leaveRoute = require('./router/LeaveRoutes');
const atsRoute = require('./router/AtsRouter');
const attendanceRoute = require('./router/AttendanceRouter');
const authRouter=require('./router/AuthRouter')
const learnRouter=require('./router/LearningRouter')
const mediaRouter=require('./router/MediaRouter')
const OrgRouter =require('./router/OrgRouter')
const FeedbackRouter =require('./router/FeedbackRouter')
const SkillSetRouter =require('./router/SkillSetRouter')
const cors = require("cors");
const logger = require("morgan");
require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 8080;
<<<<<<< Updated upstream
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(cookieParser());
=======
app.use(express.json()); //parsing



const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(logger("dev"));
app.use(cookieParser())
>>>>>>> Stashed changes
connectDB();

app.use('/api', employeeRouter);
app.use('/rec', RecRouter);
app.use('/api/leave', leaveRoute);
app.use('/ats', atsRoute);
app.use('/attendance', attendanceRoute);
app.use('/auth',authRouter)
app.use('/learn',learnRouter)
app.use('/media', mediaRouter)
app.use('/org',OrgRouter)
<<<<<<< Updated upstream
app.use('/feed',FeedbackRouter)
app.use('/skill',SkillSetRouter)


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB is connected successfully.');
=======


mongoose.connection.once("open", () => {
  console.log(`MongoDB is connected successfully.`);
>>>>>>> Stashed changes
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
