const authModel = require("../model/Authentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// * Signup * //
const signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const user = await authModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: `This email aldready exist` });
  }
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new authModel({
      firstname,
      lastname,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: `User has beeen created successfully`, newUser });
  } catch (error) {
    res.status(500).json(error);
  }
};
// * Login * //

const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await authModel.findOne({ email }).exec();
  if (!existingUser) {
    res.status(400).json({ message: `Email Id doesnt exist please SignUp` });
  }
  console.log(`existingUser ${existingUser}`);
  try {
    const isPassCrt = bcrypt.compareSync(password, existingUser.password);
    console.log(`isPassCrt ${isPassCrt}`);
    if (!isPassCrt) {
      res.status(400).json({ message: `Password is incorrect` });
      return;
    }
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "35s",
      }
    );
    console.log("Generated Token\n", token);
    if (req.cookies[`${existingUser._id}`]) {
      console.log(`req. cookies=`+req.cookies[`${existingUser._id}`]);
      req.cookies[`${existingUser._id}`] = "";
    }
    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({
        message: `The cookies has been created and logged in succcessfully`,
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
//*  export statements    *//
module.exports = {
  signup,
  login,
};
