//Controller
const atsModel = require("../model/Ats");
const fs = require("fs");
const path = require("path");
const cloudinary=require('../utils/cloudinary')
const getAts = async (req, res) => {
  try {
    const getData = await atsModel.find({});
    res.status(200).json({
      message: `Data is fetched successfully from the server`,
      getData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createAts = async (req, res) => {
  const {
    email,
    name,
    phone,
    position,
    qualification,
    college,
    graduationYear,
    department,
    cgpa,
    hsc,
    sslc,
    experience,
    skills,
    resumename,
    photoname,
    Status,
    interview,
    approve,
    round1,
    round2,
    round3,

  } = req.body;
  const file = req.file;
  console.log(file)
  const uploader = async (path) => {
    return await cloudinary.uploads(path, "Atsresume");
  };

  const { path } = file;
  const newPath = await uploader(path);
  try {
    const newAts = new atsModel({
      email,
      name,
      phone,
      position,
      college,
      graduationYear,
      department,
      cgpa,
      hsc,
      sslc,
      experience,
      qualification,
      skills,
      applied: req.body.applied,
      resume: {
        public_id:newPath.public_id,
        url: newPath.url
      },
      resumename,
      photoname,
      Status,
      interview,
      approve,
    round1,
    round2,
    round3,
    });
    console.log(`newAts  = ${newAts}`);
    await newAts.save();
    fs.unlinkSync(path);
    res.status(201).json({ message: `data has been Saved`,newAts });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteAts = async (req, res) => {
  const { id } = req.params;
  const user = await atsModel.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `User not found` });
  }
  try {
    await atsModel
      .deleteOne({ _id: id })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Deleted the user with id ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAtsId = async (req, res) => {
  const { id } = req.params;
  const user = await atsModel.findById(id).exec();
  if (!user) {
    res.status(400).json({ message: `User not found` });
  }
  try {
    await atsModel
      .findById({ _id: id })
      .then((data) => {
        res.status(200).json({ message: `The user is found`, data });
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const downloadResume = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await atsModel.findById(id).exec();
    if (!user || !user.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    const file = user.resume;
    const resumeData = Buffer.from(file.data, "base64"); // Create Buffer from base64 data
    const directoryPath = path.join(__dirname, "download");
    console.log(`directoryPath = ${directoryPath}`);
    const fileName = user.resumename;
    const filePath = path.join(directoryPath, fileName);
    console.log(`filePath = ${filePath}`);
    // Create the "download" folder if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    fs.writeFileSync(filePath, resumeData); // Write the resume data to a file
    console.log(`Resume saved at: ${filePath}`);
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${fileName}"`);
    res.sendFile(filePath);
  } catch (error) {
    console.log(`Error while downloading resume: ${error}`);
    res.status(500).json(error);
  }
};
const downloadPhoto = async (req, res) => {
  const { id } = req.params;
  const user = await atsModel.findById(id).exec();
  if (!user || !user.photo) {
    return res.status(404).json({ message: "Photo not found" });
  }
  try {
    const file = user.photo;
    const baseFileConv = Buffer.from(file.data, "base64");
    const directoryPath = path.join(__dirname, "download");
    const fileName = user.photoname;
    console.log(`directoryPath ${directoryPath}`);
    const filePath = path.join(directoryPath, fileName);
    console.log(`filePath ${filePath}`);
    //*check if dir exist if not new one will be created */
    if (!fs.existsSync(directoryPath)) {
      fs.mkdir(directoryPath);
    }
    fs.writeFileSync(filePath, baseFileConv);
    res.set("Content-Type", file.contentType);
    res.set("Content-Disposition", `attachment; filename="${fileName}"`);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const updateAts = async (req, res) => {
  const { id } = req.params;
  const user = await atsModel.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: `There is no user with id ${id}` });
  }
 
  try {
    await atsModel
      .findByIdAndUpdate(
        id,
        { $set:req.body },
        { new: true }
      )
      .then((data) => {
        res
          .status(200)
          .json({ message: `User is updated having iid ${id}`, data });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  getAts,
  createAts,
  deleteAts,
  getAtsId,
  downloadPhoto,
  downloadResume,
  updateAts,
};
