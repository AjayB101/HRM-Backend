//controllers/employeeController.js
const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
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
      res
        .status(200)
        .json({
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

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  signin,
};
