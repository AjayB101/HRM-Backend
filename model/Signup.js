const mongoose = require("mongoose");
const signupSchema = new mongoose.model(
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
  },
  { timestamps: true }
);
module.exports = mongoose.model("Signup", signupSchema);
