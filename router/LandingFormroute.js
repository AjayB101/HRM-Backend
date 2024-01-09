const express = require("express");
const landingRouter = express.Router();
const {
    createLandingForm,
    updateLandingForm
} = require("../controllers/LandingUserForm");


landingRouter.post("/create", createLandingForm);

landingRouter.put("/update/:id", updateLandingForm);

module.exports = landingRouter;