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
            productLink,
            approximateBudget,
            reportingTo,
            Reason,
            issues
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
        res.status(500).json({ message: "Internal Server Error" });
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

module.exports = { createData, getDataById, getData, deleteData };
