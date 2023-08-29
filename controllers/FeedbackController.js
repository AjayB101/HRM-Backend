const Feedback = require('../model/Feedback');

const getAllEmployees = async (req, res) => {
    try {
      const employee = await Employee.find();
      res.status(200).json(employee);
    } catch (error) {
      console.error('Error retrieving products:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error('Error retrieving employee:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  const addComment = async (req, res) => {
    try {
     
      const { comment, star } = req.body;
  
 
      await Feedback.create({ comment,star })
      .then((data) => {
        res
          .status(200)
          .json({ message: `Comment added successfully`, data });
      })
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = {
    getAllEmployees,
    getEmployeeById,
    addComment
  };