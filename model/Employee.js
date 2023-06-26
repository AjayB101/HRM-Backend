// models/employeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: {
     type: String, 
     required: true 
    },
  gender: {
     type: String,
      required: true
     },
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },  
  password: { 
    type: String,
     required: true 
    },
  mobile: { 
    type: Number,
     required: true 
    },
  alternateMobile: { 
    type: Number,
     required: true 
    },
  department: { 
    type: String, 
    required: true 
  },
  designation: {
     type: String, 
     required: true 
    },
  permanentAddress: {
     type: String, 
     required: true 
    },
  temporaryAddress: { 
    type: String, 
    required: true 
  },
  bloodGroup: { 
    type: String, 
    required: true 
  },
  joiningDate: { 
    type: Date,
     required: true
     },
  reportingTo: { 
    type: String, 
    required: true 
  },
  workType: { 
    type: String, 
    required: true
   },
   employeeid:{
    type:String,
    required:true
   }
  
},{
  timestamps:true
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
