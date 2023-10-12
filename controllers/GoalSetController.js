const mongoose = require("mongoose");
const Goal = require('../model/GoalSetModel');
const GTrack = require('../model/GoalTask');


const aggregateData = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const result = await Goal.aggregate([
      {
        $lookup: {
          from: 'goaltasks',
          localField: '_id',
          foreignField: 'goalid',
          as: 'goaldetails',
        }
      },

      {
        $project: {
          _id: 1,
          employeeId: 1,
          GoalT: 1,
          GoalP: 1,
          goaltrack: '$goaldetails'
        }
      },
      
      {
        $match:{
          "employeeId": new mongoose.Types.ObjectId(employeeId),
        }
      }

    ])

    res.status(200).json({message: 'Data is Fetched',result});
  } catch (error) {
    console.error('Error aggregating data:', error);
    res.status(500).json({ message: 'Internal server error' }) 
  }
};


// const getGoal = async (req, res) => {
//   try {
//     const { employeeId } = req.params;
//     const goa = await Goal.find({employeeId});
//     const GoalTrack = await GTrack.find({employeeId: employeeId}).populate("goalid"); 
//     if (!goa) {
//       return res.status(404).json({ message: 'No Goals for you' });
//     }
//     res.status(200).json({goa, GoalTrack});
//   } catch (error) { 
//     console.error('Error retrieving employee:', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
const getGoals = async (req, res) => {
  try {
    const goa = await Goal.find({});
    if (!goa) {
      return res.status(404).json({ message: 'No Goals for you' });
    }
    res.status(200).json({message: 'Data is Fetched',goa});
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json(error);
  }
};

  const addGoal = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { GoalT, GoalP,GoalW,GoalD, GoalTyp } = req.body;



      await Goal.create({ employeeId, GoalT, GoalP,GoalW,GoalD, GoalTyp })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Goal added successfully`, data });
      })
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  const deleteGoal = async (req, res) => {
    try {
      const { id } = req.params;
      const goa = await Goal.findByIdAndDelete(id);
      if (!goa) {
        return res.status(404).json({ message: 'Goal not found' });
      }
      res.status(200).json({message:"Goal Deleted",goa});
    } catch (error) {
      console.error('Error deleting Goal:', error.message);
      res.status(500).json(error);
    }
  };

  module.exports = {
    addGoal,
    aggregateData,

    getGoals,
    deleteGoal
  };