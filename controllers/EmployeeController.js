// controllers/employeeController.js
const Employee = require('../model/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving product:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    const { firstName, lastName, gender, dateOfBirth, mobile, alternateMobile, department, designation, permanentAddress, temporaryAddress, bloodGroup, joiningDate, reportingTo, workType } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ firstName, lastName, gender, dateOfBirth, email, password: encryptedPassword, mobile, alternateMobile, department, designation, permanentAddress, temporaryAddress, bloodGroup, joiningDate, reportingTo, workType });
    res.status(201).json('Employee created');
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName,lastName,gender,dateOfBirth,email,password, confirmPassword,mobile,alternateMobile,department,designation,permanentAddress,temporaryAddress,bloodGroupjoiningDate,reportingTo,workType} = req.body;
    const employee = await Employee.findByIdAndUpdate(
      id,
      { firstName,lastName,gender,dateOfBirth,email,password, confirmPassword,mobile,alternateMobile,department,designation,permanentAddress,temporaryAddress,bloodGroupjoiningDate,reportingTo,workType},
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'user not exist please go and register' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const secretKey = require('crypto').randomBytes(64).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '2d' })
    res.status(200).json({ message: 'User signed in successfully',token ,secretKey });
  } catch (error) {
    console.error('Error in signin:', error);
    res.status(500).json({ error: 'Internal server error' });
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
