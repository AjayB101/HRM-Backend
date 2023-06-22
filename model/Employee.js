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
    dept: {
      type: String,
      required: true,
    },
    desi: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    mob: {
      type: Number,
      required: true,
    },
    join: {
      type: Date,
      required: true,
    },
    report: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    employeeid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("employee", employeeSchema);
