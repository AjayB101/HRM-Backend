// models/employeeModel.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		lastname: {
			type: String,
			required: false,
		},
		gender: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
			unique: true,
		},
		dob: {
			type: Date,
			required: false,
		},
		isTopTier: {
			type: Boolean,
			default: false,
		},
		mob: {
			type: Number,
			required: false,
		},
		altmob: {
			type: Number,
			required: false,
		},
		dept: {
			type: String,
			required: false,
		},
		desi: {
			type: String,
			required: false,
		},
		peraddress: {
			type: String,
			required: false,
		},
		temaddress: {
			type: String,
			required: false,
		},
		bloodgroup: {
			type: String,
			required: false,
		},
		join: {
			type: Date,
			required: false,
		},
		report: [
			{
				name: {
					type: String,
				},
				id: {
					type: String,
				},
			},
		],
		fathername: {
			type: String,
			required: false,
		},
		nationality: {
			type: String,
			required: false,
		},
		emergencyContact: {
			type: Number,
			required: false,
		},
		isReported: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			required: false,
		},
		employeeid: {
			type: String,
			required: false,
		},
		approval: {
			manager: {
				type: Boolean,
				default: false,
			},
			hr: {
				type: Boolean,
				default: false,
			},
		},
		annualLeave: {
			type: String,
		},
		clockid: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Attendance2.0",
			},
		],
		profilepic: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		coverpic: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		procruitment: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "procruitment",
			},
		],
		travel:[
			{
				type: mongoose.Schema.ObjectId,
				ref: "travelExp",
			}
		]
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
