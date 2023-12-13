const express = require('express');
const router = express.Router();
const { createData, getDataById, getAllData, deleteData } = require('../controllers/Travel&Exp');
const upload = require('../middleware/multer');

router.post('/createData', upload.single('attachments'), async (req, res) => {
    await createData(req, res);
});

router.get('/getall', getAllData);
router.get('/getById/:id', getDataById);
router.delete('/deletedata/:id', deleteData);

module.exports = router;