const express = require("express");
const mongoose = require("mongoose");
const cookie=require('cookie-parser')
const app = express();
const connectDB = require("./config/dbConn");
const employeeRouter = require("./router/EmployeeRouter");
const RecRouter = require("./router/RecruitmentRouter");
const leaveRoute = require("./router/LeaveRoutes");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const { Logger }=require('./middleware/logger')
const errorHandler =require('./middleware/errorHandler')
const corsOptions=require('./config/corsOptions')
const PORT = process.env.PORT || 8080;
 
app.use(errorHandler)
app.use(Logger)
app.use(express.json()); //parsing
app.use(cors(corsOptions)); //to handle wrong port number
app.use(logger("dev"));
connectDB();

// app.use('/auth',)
app.use("/api", employeeRouter);
app.use("/rec", RecRouter);
app.use("/api/leave", leaveRoute);



mongoose.connection.once("open", () => {
  console.log(`Mongoo is connected 200 ok`);
  app.listen(PORT, () => console.log(`Server running ${PORT} `));
});


mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
