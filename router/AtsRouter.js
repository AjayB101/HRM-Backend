//Router
const express = require('express');
const multer = require('multer');
const { getAts, createAts, deleteAts, getAtsId, downloadResume, downloadPhoto, updateAts } = require('../controllers/AtsController');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
  else {
    cb(new Error('Only PDF, JPEG, and PNG files are allowed'))
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })

router.get('/', getAts);
router.post('/createAts', upload.single('resume'), createAts);
router.delete('/:id', deleteAts);
router.get('/:id', getAtsId);
router.get('/resume/:id', downloadResume);
router.get('/photo/:id', downloadPhoto);
router.put('/updateats/:id',async(req,res)=>{
  await updateAts(req,res)
})
module.exports = router;
