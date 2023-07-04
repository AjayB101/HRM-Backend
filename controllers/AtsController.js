//Controller
const atsModel = require('../model/Ats');
const fs = require('fs');
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
  const resumeFile = resume[0]
  const photoFile = photo[0]
  try {
    const newAts = new atsModel({
      email,
      name,
      phone,
      position,
      college,
      graduationYear,
      qualification ,
      skills,
      resume: {
        data: fs.readFileSync(resumeFile.path),
        contentType: resumeFile.mimetype
      },
      photo: {
        data: fs.readFileSync(photoFile.path),
        contentType: photoFile.mimetype
      }
    })
    await newAts.save()
    fs.unlinkSync(resumeFile.path)
    fs.unlinkSync(photoFile.path)
    res.status(201).json({ message: `data has been Saved` })
  } catch (error) {
    res.status(500).json(error)
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
module.exports = {
  getAts,
  createAts,
  deleteAts,
  getAtsId
};
