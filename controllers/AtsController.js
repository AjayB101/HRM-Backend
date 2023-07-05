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
  try {
    const { email, name, phone, position, higestqualification, college, graduationyear, skills } = req.body;
    const { filename, mimetype } = req.file;

    const newAts = new atsModel({
      email,
      name,
      phone,
      position,
      higestqualification ,// Correct the spelling
      college,
      graduationyear,
      skills,
      applied: req.body.applied, // Assuming "applied" is a field in the request body
      resume: {
        data: fs.readFileSync(req.file.path),
        contentType: mimetype
      }
    });

    await newAts.save();

    fs.unlinkSync(req.file.path);

    res.status(201).json({ message: 'ATS created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
