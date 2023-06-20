const express=require('express')
const mongoose=require('mongoose')
const app=express()
const connectDB=require('./config/dbConn')
const employeeRouter=require('./router/EmployeeRouter')
const cors=require('cors')
const logger=require('morgan')
app.use(express.json())//parsing 
app.use(cors())//to handle wrong port number
app.use(logger('dev'))
connectDB()
app.use('/api',employeeRouter)
mongoose.connection.once("open",()=>{ console.log(`Mongoo is connected 200 ok`); app.listen(5000,()=> console.log(`Server running ${5000} `))})
mongoose.connection.on("error",(err)=>{console.log(err); logEvents(`${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')})