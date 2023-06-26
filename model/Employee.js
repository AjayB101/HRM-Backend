// models/employeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  lastname: {
     type: String, 
     required: true 
    },
  gender: {
     type: String,
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
  dob: { 
    type: Date, 
    required: true 
  },
 
 
  mob: { 
    type: Number,
     required: true 
    },
  altmob: { 
    type: Number,
     required: true 
    },
  dept: { 
    type: String, 
    required: true 
  },
  desi: {
     type: String, 
     required: true 
    },
  peraddress: {
     type: String, 
     required: true 
    },
  temaddress: { 
    type: String, 
    required: true 
  },
  bloodgroup: { 
    type: String, 
    required: true 
  },
  join: { 
    type: Date,
     required: true
     },
  report: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    required: true
   },
  
},{
  timestamps:true
});

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;
