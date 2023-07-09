const authModel = require("../model/Authentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// * Signup * //
const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user =await authModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: `This email aldready exist` });
  }
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new authModel({
      firstname,
      lastname,
      email,
      password:hashedPass,
    });
    await newUser.save();
    res.status(200).json({ message: `User has beeen created successfully`,newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

//*  export statements    *//
module.exports = {
  signup,
};
