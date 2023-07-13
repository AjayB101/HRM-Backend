//Controller
const atsModel = require('../model/Ats');
const fs = require('fs');
const path = require('path');
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
  const { email, name, phone, position, qualification, college, graduationYear, skills } = req.body;
  const { resume, photo } = req.files;
  const resumeFile = resume[0];
  console.log(`resumeFile  = ${resumeFile}`)
  const photoFile = photo[0];
  console.log(`photoFile  = ${photoFile}`)

  try {
    const newAts = new atsModel({
      email,
      name,
      phone,
      position,
      college,
      graduationYear,
      qualification,
      skills,
      applied: req.body.applied,
      resume: {
        data: fs.readFileSync(resumeFile.path), // Read file data as Buffer
        contentType: resumeFile.mimetype,
      },
      photo: {
        data: fs.readFileSync(photoFile.path), // Read file data as Buffer
        contentType: photoFile.mimetype,
      },
    });
    console.log(`newAts  = ${newAts}`)
    await newAts.save()
    fs.unlinkSync(resumeFile.path)
    fs.unlinkSync(photoFile.path)
    res.status(201).json({ message: `data has been Saved` })
  } catch (error) {
    console.log(error)
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
    await atsModel.deleteOne({ _id: id }).then(data => {
      res.status(200).json({ message: `Deleted the user with id ${id}`, data });
    }).catch(err => res.status(400).json(err));
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
    await atsModel.findById({ _id: id }).then(data => {
      res.status(200).json({ message: `The user is found`, data });
    }).catch(err => res.status(500).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
};
const downloadResume = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await atsModel.findById(id).exec();
    if (!user || !user.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    const file = user.resume;
    const resumeData = Buffer.from(file.data, 'base64'); // Create Buffer from base64 data
    const directoryPath = path.join(__dirname, 'download');
    console.log(`directoryPath = ${directoryPath}`)
    const fileName = 'resume.pdf';
    const filePath = path.join(directoryPath, fileName);
    console.log(`filePath = ${filePath}`)
    // Create the "download" folder if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    fs.writeFileSync(filePath, resumeData); // Write the resume data to a file
    console.log(`Resume saved at: ${filePath}`);
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${fileName}"`);
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
    return res.status(404).json({ message: 'Photo not found' });
  }
  try {
    const file = user.photo
    const baseFileConv = Buffer.from(file.data, 'base64')
    const directoryPath = path.join(__dirname, 'download')
    const fileName = 'photo.png';
    console.log(`directoryPath ${directoryPath}`)
    const filePath = path.join(directoryPath, fileName)
    console.log(`filePath ${filePath}`)
    //*check if dir exist if not new one will be created */
    if (!fs.existsSync(directoryPath)) {
      fs.mkdir(directoryPath)
    }
    fs.writeFileSync(filePath, baseFileConv)
    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${fileName}"`);
    res.sendFile(filePath)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};
module.exports = {
  getAts,
  createAts,
  deleteAts,
  getAtsId,
  downloadPhoto,
  downloadResume
};
