const travelExpSchema = require("../model/Travel&Exp");
const cloudinary = require("../utils/cloudinary");
const employeeModel = require("../model/Employee");
const fs = require("fs");


const getAllData = async (req, res) => {
  try {
    const data = await travelExpSchema.find({}).populate("employeeid");
    res
      .status(200)
      .json({ message: "Data Has Been Fetched From The Server", data });
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
    res
      .status(200)
      .json({ message: "Data Has Been Fetched From The Server", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// const createData = async (req, res) => {
//   const {
//     from,
//     to,
//     startdate,
//     enddate,
//     days,
//     budget,
//     business,
//     claimtype,
//     transport,
//     employeeid,
//     reportingTo,
//   } = req.body;

//   try {
//     // Parse the date string using moment
//     const formattedStartDate = moment(startdate).toDate();
//     const formattedEndDate = moment(enddate).toDate();

//     const file = req.file;

//     const attachments = file
//       ? {
//           public_id: file.public_id,
//           url: file.url,
//         }
//       : null;
//     let reportingToArray;

//     try {
//       reportingToArray = JSON.parse(reportingTo);
//     } catch (error) {
//       console.error("Error parsing reportingTo field:", error);
//       reportingToArray = [];
//     }

//     const travelData = new travelExpSchema({
//       from,
//       to,
//       startdate: formattedStartDate,
//       enddate: formattedEndDate,
//       days,
//       budget,
//       business,
//       claimtype,
//       transport,
//       employeeid,
//       attachments,
//       reportingTo: reportingToArray,
//     });

//     await travelData.save();

//     if (file) {
//       fs.unlinkSync(file.path);
//     }

//     await employeeModel.findByIdAndUpdate(employeeid, {
//       $push: { travel: travelData._id },
//     });

//     res.status(200).json({ message: "Data Has Been Created", travelData });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// };

const createData = async (req, res) => {
  try {
    const files = req.file;

    const uploader = async (path) => {
      return await cloudinary.uploads(path, "travel");
    };

    let newPath;

    if (files) {
      const { path } = files;
      newPath = await uploader(path);
      fs.unlinkSync(path);
    }

    const {
      from,
      to,
      startdate,
      enddate,
      days,
      budget,
      business,
      claimtype,
      transport,
      employeeid,
      reportingTo,
    } = req.body;

    let reportingToArray=[];

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

    const travelData = new travelExpSchema({
        from,
        to,
        startdate,
        enddate,
        days,
        budget,
        business,
        claimtype,
        transport,
        employeeid,
        attachments,
        reportingTo: reportingToArray,
    });

    const savedData = await travelData.save();

    if (attachments) {
      await employeeModel.findByIdAndUpdate(
        req.body.employeeid,
        {
          $push: { travel: travelData._id },
        },
        { new: true }
      );
    }

    res
      .status(200)
      .json({ message: "Data Has Been Stored To The Server", savedData });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
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
const updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const travelData = await travelExpSchema.findById(id);

    if (!travelData) {
      return res.status(400).json({ message: "No Travel Data Found" });
    }

    // Assuming you have a specific reportingToId in the request body or query parameter
    // const reportingToId = req.body.reportingToId || req.query.reportingToId;

    // if (!reportingToId) {
    //   return res.status(400).json({ message: "reportingToId is required" });
    // }

    const reportingToIndex = travelData.reportingTo.findIndex(
      (item) => item._id.toString() 
    );

    if (reportingToIndex === -1) {
      return res.status(400).json({ message: "No ReportingTo Data Found" });
    }

    travelData.reportingTo[reportingToIndex].approved = true;

    await travelData.save();

    res.status(200).json({
      message: "Approval Status Updated Successfully",
      travelData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

module.exports = { getAllData, getDataById, createData, deleteData, updateApprovalStatus };



