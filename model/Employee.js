// models/employeeModel.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
   isTopTier:{
    type:Boolean,
    default:false
   },
    mob: {
      type: Number,
      required: true,
    },
    altmob: {
      type: Number,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    desi: {
      type: String,
      required: true,
    },
    peraddress: {
      type: String,
      required: true,
    },
    temaddress: {
      type: String,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    join: {
      type: Date,
      required: true,
    },
    report: [
      {
        name: {
          type: String,
        },
        id: {
          type: String,
        },
      },
    ],
    isReported: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    employeeid: {
      type: String,
      required: true,
    },
    approval: {
      manager: {
        type: Boolean,
        default: false,
      },
      hr: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
