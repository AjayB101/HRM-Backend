const mongoose = require("mongoose");

const atsSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [false, "Email is required"],
			trim: false,
			lowercase: false,
			// unique: false,
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
			required: [false, "Please select the role"],
		},
		qualification: {
			type: String,
			required: false,
		},
		college: {
			type: String,
			required: [false, "Please enter the College Name"],
		},
		graduationYear: {
			type: String,
			required: [false, "Please Select the Year of Passing"],
		},
		department: {
			type: String,
			required: [false, "Please Select the Department"],
		},
		cgpa: {
			type: Number,
			required: [false, "Please Select the CGPA"],
		},
		hsc: {
			type: Number,
			required: [false, "Please Select the HSC"],
		},
		sslc: {
			type: Number,
			required: [false, "Please Select the SSLC"],
		},
		experience: {
			type: Number,
			required: [false, "Please Select the experience "],
		},
		skills: {
			type: [String],
			required: false,
		},
		appliedAt: {
			type: Date,
			default: Date.now,
			required: [false, "Please provide the applied date"],
		},
		resume: {
			public_id:{
        type:String
      },
      url: {
        type: String,
      }
		},
		Status: {
			type: String,
			default: "null",
		},
		interview: {
			type: Date,
		},
		approve: {
			type: String,
		},
		round1: {
			type: String,
		},
		round2: {
			type: String,
		},
		round3: {
			type: String,
		},
	},
	{ timestamps: false }
);

module.exports = mongoose.model("ApplicationTrackingSystem", atsSchema);
