const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/dbConn");

const employeeRouter = require("./router/EmployeeRouter");
const RecRouter = require("./router/RecruitmentRouter");
const leaveRoute = require("./router/LeaveRoutes");
const atsRoute = require('./router/AtsRouter');
const attendanceRoute = require('./router/AttendanceRouter');
const authRouter=require('./router/AuthRouter')
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(express.json()); //parsing
app.use(cors({credentials:true,origin:"http://localhost:3000"})); //to handle wrong port number
app.use(logger("dev"));
app.use(cookieParser())
connectDB();

app.use("/api", employeeRouter);
app.use("/rec", RecRouter);
app.use("/api/leave", leaveRoute);
app.use("/ats", atsRoute);
app.use('/attendance', attendanceRoute);
app.use('/auth',authRouter)
mongoose.connection.once("open", () => {
  console.log(`MongoDB is connected successfully.`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  // Handle the error appropriately
});
