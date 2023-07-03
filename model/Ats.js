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
    higestqualification: {
      type: String,
      enum: [
        "BCA",
        "MCA",
        "BBA",
        "MBA",
        "B.Tech",
        " M.Tech",
        " B.Sc.",
        " M.Sc",
        "B.E"
      ],
      required: [true, "Please Select the Qualification"],
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
      required: [true, "Please Select the Yop"],
      // status: {
      //   type: String,
      //   enum: ["Received", "Under Review", "Interview", "Offer", "Hired"],
      //   default: "Received",
      //   required: [true, "Please mention the status"],
      // },
      skills: {
        type: [String],
        required: false,
      },
      appliedAt: {
        type: Date,
        default: Date.now,
        required: [true, "Mention the applied date"],
      },
      resume: {
        data: Buffer,
        contentType:String,
        required: [true, `Please enter  resume`],
      },
      Photo: {
       data:Buffer,
       contentType:String,
       required:true
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Applicat Tracking System', atsSchema)
