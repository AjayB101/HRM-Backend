const SkillSet = require('../model/SkillSet');

const getSkill = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const skill = await SkillSet.find({employeeId});
    if (!skill) {
      return res.status(404).json({ message: 'No Skill to show' });
    }
    res.status(200).json({message:"Skill is Fetched",skill});
  } catch (error) {
    console.error('Error retrieving Skill:', error.message);
    res.status(500).json(error);
  }
};
const getSkills = async (req, res) => {
  try {
    const skill = await SkillSet.find({});
    if (!skill) {
      return res.status(404).json({ message: 'No Skills to shown' });
    }
    res.status(200).json({message: 'Skills is Fetched',skill});
  } catch (error) {
    console.error('Error retrieving Skills:', error.message);
    res.status(500).json(error);
  }
};

  const addSkill = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { skillset,current,requi,goal } = req.body;



      await SkillSet.create({ employeeId,skillset,current,requi,goal })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Skill is added successfully`, data });
      })
    } catch (error) {
      console.error('Error creating skill:', error);
      res.status(500).json(error);
    }
  };

  module.exports = {
    addSkill,
    getSkill,
    getSkills
  };