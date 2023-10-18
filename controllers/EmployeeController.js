//controllers/employeeController.js
const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find({}).populate({
      path: "clockid",
      populate: {
        path: "break",
        model: "break",
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate({
      path: "clockid",
      populate: {
        path: "break",
        model: "break",
      },
    });
    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving employee:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const {
      name,
      lastname,
      gender,
      email,
      dob,
      mob,
      altmob,
      dept,
      desi,
      peraddress,
      temaddress,
      bloodgroup,
      join,
      type,
      title,
      fathername,
      nationality,
      religion,
    } = req.body;
    // Generate employeeid
    const employeeid = generateEmployeeId();
    await Employee.create({
      name,
      lastname,
      gender,
      email,
      dob,
      mob,
      altmob,
      dept,
      desi,
      peraddress,
      temaddress,
      bloodgroup,
      join,
      type,
      employeeid,
      title,
      fathername,
      nationality,
      religion,
    }).then((data) => {
      res.status(200).json({
        message: `The employee data has been added successfully`,
        data,
      });
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to generate employeeid
const generateEmployeeId = () => {
  const prefix = "ID";
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  const employeeid = prefix + randomNumber.toString();
  return employeeid;
};
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Employee.findById(id).exec();
    if (!user) {
      return res
        .status(400)
        .json({ message: `There is no user with id ${id}` });
    }

    const updateData = { ...req.body };
    delete updateData.password;
    delete updateData.confirmPassword;

    if (req.body.report) {
      // Assuming report is an array, push the new report object(s) into it
      user.report = user.report.concat(req.body.report);
      delete updateData.report; // Remove "report" from updateData since we handled it separately
    }

    await Employee.findByIdAndUpdate(id, { $set: updateData })
      .then((data) => {
        user.save();
        res
          .status(200)
          .json({ message: `User is updated with id ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: "user not exist please go and register" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const secretKey = require("crypto").randomBytes(64).toString("hex");
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "2d",
    });
    res
      .status(200)
      .json({ message: "User signed in successfully", token, secretKey });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const uploadProfile=async(req,res)=>{
try {
  const {id}=req.params
  const employeeData=await Employee.findById(id)
  if(!employeeData){
    return res.status(400).json({message:'No Data Has Been Found'})
  }
  const files = req.file;
  const uploader=async(path)=>{
    return await cloudinary.uploads(path,'profile')
  }
  const {path}=files
  const newPath=await uploader(path)
  employeeData.profilepic={
    public_id:newPath.public_id,
    url:newPath.url
  }
  fs.unlinkSync(path);
  await employeeData.save()
  return res.status(200).json({message:"Profile Picture Has Been Uploaded",employeeData})
} catch (error) {
  console.log(error)
  return res.status(500).json(error)
}
  
}

const coverPicUpload=async(req,res)=>{
  try {
    const {id}=req.params
    const employeeData=await Employee.findById(id)
    if(!employeeData){
      return res.status(400).json({message:'No Data Has Been Found'})
    }
    const file=req.file
    const {path}=file
    const uploader=async(path)=>{
      return await cloudinary.uploads(path,'coverphoto')
    }
    const newPath=await uploader(path)
    employeeData.coverpic={
      public_id:newPath.public_id,
      url:newPath.url
    }
    await employeeData.save()
    return res.status(200).json({message:'CoverPic has Been Uploaded Successfully',employeeData})
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  signin,
  uploadProfile,
  coverPicUpload
};
