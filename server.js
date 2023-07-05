const express = require("express");
const mongoose = require("mongoose");

const app = express();
const connectDB = require("./config/dbConn");

const employeeRouter = require("./router/EmployeeRouter");
const RecRouter = require("./router/RecruitmentRouter");
const leaveRoute = require("./router/LeaveRoutes");
const atsRoute = require('./router/AtsRouter');
const attendanceRoute = require('./router/AttendanceRouter');

const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
app.use(express.json()); //parsing
app.use(cors()); //to handle wrong port number
app.use(logger("dev"));
connectDB();

app.use("/api", employeeRouter);
app.use("/rec", RecRouter);
app.use("/api/leave", leaveRoute);
app.use("/ats", atsRoute);
app.use('/api/attendance', attendanceRoute);

mongoose.connection.once("open", () => {
  console.log(`MongoDB is connected successfully.`);
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  // Handle the error appropriately
});
