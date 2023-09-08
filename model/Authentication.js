const mongoose = require("mongoose");
const AuthenticationSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please Enter FirstName"],
    },
    lastname: {
      type: String,
      required: [true, "Please Enter Lastname"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
    role: {
      type: String,
      default:'user'
    },
    employeeId: {
      type: String,
    },
    isEmployee:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Authentication", AuthenticationSchema);
