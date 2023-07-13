const mongoose = require("mongoose");

const atsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      // unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    name: {
      type: String,
      required: [true, "Please enter the Name"],
    },
    phone: {
      type: String,
      required: [true, "Please enter Phone Number"],
      trim: true,
      match: /^\d{10}$/,
    },
    position: {
      type: String,
      required: [true, "Please select the role"],
    },
    qualification: {
      type: String,
      required: true
    },
    college: {
      type: String,
      required: [true, "Please enter the College Name"],
    },
    graduationYear: {
      type: String,
      required: [true, "Please Select the Year of Passing"],
    },
    department:{
      type:String,
      required:[true,'Please choose department']
    },
    skills: {
      type: [String],
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
      required: [true, "Please provide the applied date"],
    },
    resume: {
      data: Buffer,
      contentType: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplicationTrackingSystem", atsSchema);
