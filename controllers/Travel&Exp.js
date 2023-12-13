const travelExpSchema = require("../model/Travel&Exp");
const cloudinary = require("../utils/cloudinary");
const employeeModel = require("../model/Employee");
const fs = require("fs");
const moment = require('moment');

const getAllData = async (req, res) => {
    try {
        const data = await travelExpSchema.find({}).populate("employeeid");
        res.status(200).json({ message: "Data Has Been Fetched From The Server", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await travelExpSchema.findById(id).populate("employeeid");
        if (!data) {
            return res.status(400).json({ message: "No Data Has Been Found" });
        }
        res.status(200).json({ message: "Data Has Been Fetched From The Server", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const createData = async (req, res) => {
    const { from, to, startdate, enddate, days, budget, business, claimtype, transport, employeeid,reportingTo } = req.body;

    try {
        // Parse the date string using moment
        const formattedStartDate = moment(startdate).toDate();
        const formattedEndDate = moment(enddate).toDate();

        const file = req.file;
	
        const attachments = file
            ? {
                public_id: file.public_id,
                url: file.url,
            }
            : null;
			let reportingToArray;

        try {
            reportingToArray = JSON.parse(reportingTo);
        } catch (error) {
            console.error("Error parsing reportingTo field:", error);
            reportingToArray = [];
        }

        const travelData = new travelExpSchema({
            from,
            to,
            startdate: formattedStartDate,
            enddate: formattedEndDate,
            days,
            budget,
            business,
            claimtype,
            transport,
            employeeid,
            attachments,
			reportingTo: reportingToArray,
        });
		

        await travelData.save();

        if (file) {
            fs.unlinkSync(file.path);
        }

        await employeeModel.findByIdAndUpdate(employeeid, {
            $push: { travel: travelData._id },
        });

        res.status(200).json({ message: "Data Has Been Created", travelData });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await travelExpSchema.findById(id);
        if (!data) {
            return res.status(400).json({ message: "No Data Has Been Found" });
        }

        await employeeModel.findByIdAndUpdate(data.employeeid, {
            $pull: { travel: id },
        });
        await travelExpSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Data Has Been Deleted From The Server" });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

module.exports = { getAllData, getDataById, createData, deleteData };