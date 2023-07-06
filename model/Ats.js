const mongoose = require("mongoose");

const atsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
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
      enum: ["Software Associate"],
      required: [true, "Please select the role"],
    },
    highestQualification: {
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
      required: false,
    },
    college: {
      type: String,
      required: [true, "Please enter the College Name"],
    },
    graduationyear: {
      type: String,
      enum: [
        "2023", "2022", "2021", "2020", "2019"
      ],
      required:false,
    },
    skills: {
      type: String,
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
