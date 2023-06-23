const mongoose = require("mongoose");
const recruitmentSchema = new mongoose.Schema(
  {
    jobrole: {
      type: String,
      required: true,
    },
    opeanings: {
      type: String,
      required: true,
    },
    worktype: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports=mongoose.model("recruitment",recruitmentSchema)
