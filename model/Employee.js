const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    firstname: {
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
    },
    department: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningdate: {
      type: Date,
      required: true,
    },
    reportingto: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    worktype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("employee", employeeSchema);
