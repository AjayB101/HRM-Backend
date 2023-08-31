const Feedback = require('../model/Feedback');

const getComment = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const feed = await Feedback.find({employeeId});
    if (!feed) {
      return res.status(404).json({ message: 'No Comments for you' });
    }
    res.status(200).json(feed);
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getComments = async (req, res) => {
  try {
    const feed = await Feedback.find({});
    if (!feed) {
      return res.status(404).json({ message: 'No Comments for you' });
    }
    res.status(200).json({message: 'Data is Fetched',feed});
  } catch (error) {
    console.error('Error retrieving employee:', error.message);
    res.status(500).json(error);
  }
};

  const addComment = async (req, res) => {
    try {
      const { employeeId } = req.params;
      const { comment, star } = req.body;



      await Feedback.create({ employeeId, comment,star })
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
    addComment,
    getComment,
    getComments
  };