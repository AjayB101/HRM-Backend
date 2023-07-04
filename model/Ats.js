const mongoose = require("mongoose");
const atsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [false, "Email is required"],
      trim: false,
      lowercase: false,
      unique: false,
      match: /^\S+@\S+\.\S+$/,
    },
    name: {
      type: String,
      required: [false, "Please enter the Name"],
    },
    phone: {
      type: String,
      required: [false, "Please enter Phone Number"],
      trim: false,
      match: /^\d{10}$/,
    },
    position: {
      type: String,
      enum: ["Software Associate"],
      required: [false, "Please select the role"],
    },
    higestqualification: {
      type: String,
      enum: [
        "BCA",
        "MCA",
        "BBA",
        "MBA",
        "B.Tech",
        "M.Tech",
        "B.Sc.",
        "M.Sc",
        "B.E"
      ],
      required: [false, "Please Select the Qualification"],
    },
    college: {
      type: String,
      required: [false, "Please enter the College Name"],
    },
    graduationyear: {
      type: String,
      enum: [
        "2023", "2022", "2021", "2020", "2019"
      ],
      required: [false, "Please Select the Year of Passing"],
    },
    skills: {
      type: String,
      required: false,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
      required: [false, "Please provide the applied date"],
    },
    resume: {
      type: String,
      required:false
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("ApplicationTrackingSystem", atsSchema);
