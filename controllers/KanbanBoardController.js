const Board = require('../models/KanbanBoardModel')
const Task = require('../models/KanbanTaskModel')


const createk = async (req, res) => {
  try {

    if(title!=NULL)
    {
    // Define the names of predefined sections
    const preTitles = ['ICEBOX', 'INPROGRESS', 'COMPLETED', 'BLOCKED'];

    // Create an array to store the created sections
    const createdSections = [];

    // Create the predefined sections
    for (const preTitle of preTitles) {
      const section = await Section.create({ name: preTitle });
      createdSections.push(section);
    }

    // Create the board and associate it with the created sections
    const board = await Board.create({
      title: req.Goal._id,
      position: 0, // Adjust the position as needed
      sections: createdSections.map((section) => section._id), // Associate sections by their IDs
    });
  }


    res.status(201).json(board);
  } catch (err) {
    res.status(500).json(err);
  }
};



// const createk = async (req, res) => {
//   try {
//     // const boardsCount = await Board.find().count()
//     const pre_title = ['ICEBOX', 'INPROGRESS', 'COMPLETED', 'BLOCKED']
//     const board = await Board.create({
//       user: req.Goal._id,
//       position: boardsCount > 0 ? boardsCount : 0,
//       section: pre_title,
//     })




//     res.status(201).json(board)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

const getAllk = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.Goal._id }).sort('-position')
    res.status(200).json(boards)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updatePositionk = async (req, res) => {
  const { boards } = req.body
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }
    res.status(200).json('updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

const getOnek = async (req, res) => {
  const { boardId } = req.params
  try {
    const board = await Board.findOne({ user: req.Goal._id, _id: boardId })
    if (!board) return res.status(404).json('Board not found')
    const sections = await Section.find({ board: boardId })
    for (const section of sections) {
      const tasks = await Task.find({ section: section.id }).populate('section').sort('-position')
      section._doc.tasks = tasks
    }
    board._doc.sections = sections
    res.status(200).json(board)
  } catch (err) {
    res.status(500).json(err)
  }
}

// const updateb = async (req, res) => {
//   const { boardId } = req.params
//   const {  description, } = req.body

//   try {
//     // if (title === '') req.body.title = 'Untitled'
//     if (description === '') req.body.description = 'Add description here'
//     const currentBoard = await Board.findById(boardId)
//     if (!currentBoard) return res.status(404).json('Board not found')

//        const board = await Board.findByIdAndUpdate(
//       boardId,
//       { $set: req.body }
//     )
//     res.status(200).json(board)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }



// const deleteb = async (req, res) => {
//   const { boardId } = req.params
//   try {
//     const sections = await Section.find({ board: boardId })
//     for (const section of sections) {
//       await Task.deleteMany({ section: section.id })
//     }
//     await Section.deleteMany({ board: boardId })

   

//     await Board.deleteOne({ _id: boardId })

//     const boards = await Board.find().sort('position')
//     for (const key in boards) {
//       const board = boards[key]
//       await Board.findByIdAndUpdate(
//         board.id,
//         { $set: { position: key } }
//       )
//     }

//     res.status(200).json('deleted')
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }

module.exports = {


  getOnek,
  createk,
  getAllk,
  updatePositionk
};