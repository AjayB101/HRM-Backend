const mongoose = require("mongoose");
const recruitmentSchema = new mongoose.Schema(
  {
    Jobrole: {
      type: String,
      required: false,
    },
    Openings: {
      type: Number,
      required: false,
    },
    Company: {
      type: String,
      required: false,
    },
    Description: {
      type: String,
      required: false,
    },
    ApplicationLink: {
      type: String,
      required: false,
    },
    ExperienceFrom: {
      type: Number,
      required: false,
    },
    Clientname: {
      type: String,
      required:false
    },
    Clientcompany: {
      type: String,
      required:false
    },
    Hrname: {
      type: [String],
      required:false
    },
    orgData: [{
      name:{
        type:String,
      } ,
      id:{
        type:String
      },
   } ],
    Hrcontact: {
      type: Number,
      required: false,
    },
    Interview: {
      type: [String],
      required: false,
    },
    Interviewrounds: {
      type: Number,
      required: false,
    },
    ExperienceTo: {
      type: Number,
      required: false,
    },
    Deadline: {
      type: String,
      required: false,
    },
    Worktype: {
      type: String,
      required: false,
    },

    Skills: {
      type: [String],
      required: false,
    },
    Education: {
      type: [String],
      required: false,
    },
    Othereducation: {
      type: String,
      required: false,
    },
    Year: {
      type: [String],
      required: false,
    },
    Location: {
      type: String,
      required: false,
    },
    uuid: {
      type: String,
      required: false,
    },
    approvalstatus:{
      manager:{
        type:Boolean,
        default:false
      },
      hr:{
        type:Boolean,
        default:false
      },
    }
  },
  {
    timestamps: false,
  }
);
module.exports = mongoose.model("recruitments", recruitmentSchema);
