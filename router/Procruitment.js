const express = require('express');
const upload = require('../middleware/multer');
const { createData, getDataById, getData, deleteData, updateData,updateDataRejected } = require('../controllers/Procruitment'); // Make sure updateData is imported
const router = express.Router();

router.get('/getall', async (req, res) => {
    await getData(req, res);
});

router.get('/getbyid/:id', async (req, res) => {
    await getDataById(req, res);
});

router.post('/createdata', upload.single('attachments'), async (req, res) => {
    await createData(req, res);
});

router.put('/updatedata/:id', async (req, res) => {
    await updateData(req, res);
});

router.delete('/deletedata/:id', async (req, res) => {
    await deleteData(req, res);
});
router.put('/update-rejected/:id', async (req, res) => {
    await updateDataRejected(req, res);
});


module.exports = router;
