// controllers/employeeController.js
const Employee = require('../model/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'gmail'
  auth: {
    user: 'kannasn003@gmail.com',
    pass: 'jpfvlsekorzehqjp',
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'kannasn003@gmail.com',
      to,
      subject,
      text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

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
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Invalid email. Only Gmail accounts are allowed.' });
    }
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password do not match' });
    }
    const { name, lastname, gender, dob, mob, altmob, dept, desi, peraddress, temaddress, bloodgroup, join, report, type } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Generate employeeid
    const employeeid = generateEmployeeId();

    const employee = await Employee.create({ name, lastname, gender, email, password: encryptedPassword, dob, mob, altmob, dept, desi, peraddress, temaddress, bloodgroup, join, report, type, employeeid });

    // Send email
    const emailSubject = 'Welcome to SNS Square! Find Your Task Management Tool Credentials';
    const emailText = `Dear ${name},\n\nWelcome to SNS Square Consultancy Services Pvt Ltd!\n\nWe are delighted to have you on board. As part of your onboarding, we are pleased to provide you with the credentials for our Task Management Tool:\n\nEmail:${email}\nUser ID: ${employeeid}\nPassword: ${password}\n\nTo access the tool,This tool will help you organize and track your tasks efficiently.\n\nWe're excited to work with you and wish you a successful journey at SNS Square Consultancy Services Pvt Ltd!\n\nBest regards,\n\nHR Team\nSNS Square Consultancy Services Pvt Ltd`;
    sendEmail(email, emailSubject, emailText);

    // Send WhatsApp notification
    const twilioAccountSid = 'AC61c22964a61910b92c8174002c7b251e';
    const twilioAuthToken = 'fa333bfb9273eeb58e0b4071949baa9d';
    const twilioMessagingServiceSid = 'your-messaging-service-sid'; // Replace with your Messaging Service SID
    const client = require('twilio')(twilioAccountSid, twilioAuthToken);
    const whatsappMessage = `Dear ${name},\n\nWelcome to SNS Square! Your employee ID is ${employeeid}.`;
    client.messages.create({
      body: whatsappMessage,
      messagingServiceSid: twilioMessagingServiceSid,
      to: `whatsapp:${mob}` // assuming `mob` is the employee's mobile number
    }).then((message) => console.log('WhatsApp message sent successfully:', message.sid));

    res.status(201).json('Employee created');
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(500).json({ message: 'Internal server error' });
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
  const user = Employee.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `There is no user with id ${id}` });
  }
  try {
    delete req.body.password;
    delete req.body.confirmPassword;
    await Employee
      .findByIdAndUpdate(id, { $set: req.body })
      .then((data) => {
        res
          .status(200)
          .json({ message: `User is updated having iid ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist. Please register first' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    const secretKey = require('crypto').randomBytes(64).toString('hex');
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '2d' })
    res.status(200).json({ message: 'User signed in successfully', token, userId: user._id });
  } catch (error) {
    console.error('Error signing in:', error.message);
    res.status(500).json({ message: 'Internal server error' });
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
