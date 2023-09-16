const Goal = require('../model/GoalSetModel');
const GoalTrack = require('../model/KanbanBoard');


const getGoal = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const goa = await Goal.find({employeeId});
    if (!goa) {
      return res.status(404).json({ message: 'No Goals for you' });
    }
    res.status(200).json(goa);
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
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

      const newGoalTracking = new GoalTrack({
        goalId: addGoal._id,
        description: 'value1', // Include specific values for field1, field2, etc.
        field2: 'value2',
        field3: 'value3',
      });
      
      await newGoalTracking.save()
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
    getGoal,
    getGoals,
    deleteGoal
  };