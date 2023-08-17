const mongoose = require("mongoose");
const recruitmentSchema = new mongoose.Schema(
  {
    Jobrole: {
      type: String,
      required: true,
    },
    Openings: {
      type: Number,
      required: true,
    },
    Company: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: false,
    },
    ApplicationLink: {
      type: String,
      required: true,
    },
    ExperienceFrom: {
      type: Number,
      required: true,
    },
    Clientname: {
      type: String,
      required:true
    },
    Clientcompany: {
      type: String,
      required:true
    },
    Hrname: {
      type: String,
      required:true
    },
    Hrcontact: {
      type: Number,
      required: true,
    },
    Interview: {
      type: String,
      required: true,
    },
    Interviewrounds: {
      type: Number,
      required: true,
    },
    ExperienceTo: {
      type: Number,
      required: true,
    },
    Deadline: {
      type: String,
      required: true,
    },
    Worktype: {
      type: String,
      required: true,
    },

    Skills: {
      type: [String],
      required: true,
    },
    Education: {
      type: [String],
      required: false,
    },
    Othereducation: {
      type: [String],
      required: true,
    },
    Year: {
      type: [String],
      required: true,
    },
    Location: {
      type: String,
      required: false,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("recruitments", recruitmentSchema);
