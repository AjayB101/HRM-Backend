const procruitmentModel = require("../model/Procruitment");
const employeeModel = require("../model/Employee");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const getData = async (req, res) => {
    try {
        const data = await procruitmentModel.find({}).populate("employeeid");
        res.status(200).json({ message: "Data Has Been Fetched From The Server", data });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getDataById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "No Id Has Been Found" });
        }
        const data = await procruitmentModel.findById(id).populate("employeeid");
        if (!data) {
            return res.status(400).json(`No Data Has Been Found With The Id ${id}`);
        }
        res.status(200).json({ message: "Data Has Been Fetched From The Server", data });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};
const createData = async (req, res) => {
    try {
        const files = req.file;

        const uploader = async (path) => {
            return await cloudinary.uploads(path, "procruitment");
        };

        let newPath;

        if (files) {
            const { path } = files;
            newPath = await uploader(path);
            fs.unlinkSync(path);
        }

        const {
            Specification,
            employeeid,
            vendorNumber,
            vendorName,
            productname,
            businessJustification,
            quantity,
            priority,
            Reason,
            productLink,
            approximateBudget,
            reportingTo,
            issues,
            SecondRequest,
            SecondJustification,
        } = req.body;

        let reportingToArray;

        try {
            reportingToArray = JSON.parse(reportingTo);
        } catch (error) {
            console.error("Error parsing reportingTo field:", error);
            reportingToArray = [];
        }

        const attachments = files
        ? {
            public_id: newPath.public_id,
            url: newPath.url,
        }
        : null; 

        const procruitmentData = new procruitmentModel({
            employeeid,
            issues,
            Specification,
            vendorNumber,
            vendorName,
            productname,
            businessJustification,
            quantity,
            priority,
            Reason,
            productLink,
            approximateBudget,
            reportingTo: reportingToArray,
            attachments,
            SecondRequest,
            SecondJustification,
        });

        const savedData = await procruitmentData.save();

        if (attachments) {
            await employeeModel.findByIdAndUpdate(
                req.body.employeeid,
                {
                    $push: { procruitment: savedData._id },
                },
                { new: true }
            );
        }

        res.status(200).json({ message: "Data Has Been Stored To The Server", savedData });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};



const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "No Id Has Been Found" });
        }
        const data = await procruitmentModel.findById(id);
        if (!data) {
            return res
                .status(400)
                .json({ message: `No Data Has Been Found With The Id ${id}` });
        }
        await procruitmentModel.findByIdAndDelete(id);
        await employeeModel.findByIdAndUpdate(data.employeeid, {
            $pull: { procruitment: id },
        });
        res.status(200).json({ message: "Data Has Been Deleted From The Server" });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const updateData = async (req, res) => {
    try {
        const { id } = req.params;
        const { SecondRequest, SecondJustification } = req.body;

        if (!id) {
            return res.status(400).json({ message: "No ID has been provided for update" });
        }

        // Retrieve the current document
        const currentData = await procruitmentModel.findById(id);
        if (!currentData) {
            return res.status(404).json({ message: "Data not found for the provided ID" });
        }

        const updateObject = {};
        if (SecondRequest !== undefined && SecondJustification !== undefined) {
            
            currentData.reportingTo.forEach(reporting => {
                reporting.approved = true; 
            });

            updateObject.SecondRequest = SecondRequest;
            updateObject.SecondJustification = SecondJustification;
            updateObject.reportingTo = currentData.reportingTo;
        }

        // Update the document in the database
        const updatedData = await procruitmentModel.findByIdAndUpdate(
            id,
            { $set: updateObject },
            { new: true }
        );

        res.status(200).json({ message: "Data has been updated successfully", updatedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateDataRejected = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "No ID has been provided for update" });
        }

        // Retrieve the current document
        const currentData = await procruitmentModel.findById(id);
        if (!currentData) {
            return res.status(404).json({ message: "Data not found for the provided ID" });
        }

        // Update rejected in reportingTo array
        currentData.reportingTo.forEach(reporting => {
            reporting.rejected = true; // Set rejected to true
        });

        // Update the document in the database
        const updatedData = await procruitmentModel.findByIdAndUpdate(
            id,
            { $set: { reportingTo: currentData.reportingTo } }, // Update only the reportingTo field
            { new: true }
        );

        res.status(200).json({ message: "Data has been updated with rejected status", updatedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createData, getDataById, getData, deleteData, updateData, updateDataRejected };


