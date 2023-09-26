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
const authRouter = require('./router/AuthRouter');
const mediaRouter = require('./router/MediaRouter');
const OrgRouter = require('./router/OrgRouter');
const FeedbackRouter = require('./router/FeedbackRouter');
const GoalSetRouter = require('./router/GoalSetRouter')
const SkillSetRouter = require('./router/SkillSetRouter');
const videoRouter = require('./router/VideoRouter');
const calenderRouter=require('./router/LeaveCalRouter')
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 8080;
app.use(express.json());
const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(cookieParser());
connectDB();

app.use('/api', employeeRouter);
app.use('/rec', RecRouter);
app.use('/api/leave', leaveRoute);
app.use('/ats', atsRoute);
app.use('/attendance', attendanceRoute);
app.use('/auth', authRouter);
app.use('/media', mediaRouter);
app.use('/org', OrgRouter);
app.use('/feed', FeedbackRouter);
app.use('/skill', SkillSetRouter);
app.use('/videos', videoRouter);
app.use('/goal',GoalSetRouter)
app.use('/cal',calenderRouter)

process.on('unhandledRejection', (reason, promise) => { 
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB is connected successfully.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


