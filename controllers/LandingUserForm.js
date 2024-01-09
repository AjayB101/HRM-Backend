const LandingForm = require('../model/LandingFormModal');

const createLandingForm = async (req, res) => {
    try {
        const { name, email, phoneno, MarkasRead } = req.body;
    
        const newLandingForm = new LandingForm({
            name,
            email,
            phoneno,
            MarkasRead
        });
        const savedLandingForm = await newLandingForm.save();
        res.status(201).json(savedLandingForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateLandingForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { MarkasRead } = req.body;
        const updatedLandingForm = await LandingForm.findByIdAndUpdate(
            id,
            {
            MarkasRead
            },
            { new: true }
        );

        if (!updatedLandingForm) {
            return res.status(404).json({ error: 'LandingForm not found' });
        }

        res.status(200).json(updatedLandingForm);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createLandingForm,
    updateLandingForm
};