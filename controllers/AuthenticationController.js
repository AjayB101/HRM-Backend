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
  // * Checing if email exist aldready if not throw error  * //
  const existingUser = await authModel.findOne({ email }).exec();
  if (!existingUser) {
    res.status(400).json({ message: `Email Id doesnt exist please SignUp` });
  }
  console.log(`existingUser ${existingUser}`);
  try {
    // * if email exist then we confirm the pass if not corect nthrows error * //
    const isPassCrt = bcrypt.compareSync(password, existingUser.password);
    console.log(`isPassCrt ${isPassCrt}`);
    if (!isPassCrt) {
      res.status(400).json({ message: `Password is incorrect` });
      return;
    }
    // * if logged in we genereate jwt token to user id * //
    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "35s",
      }
    );
    console.log("Generated Token\n", token);
    // * checking if cookies aldready exits if yes then clear the cookies * //
    if (req.cookies[`${existingUser._id}`]) {
      console.log(`req. cookies=` + req.cookies[`${existingUser._id}`]);
      req.cookies[`${existingUser._id}`] = "";
    }
    // * if no cookies present then we create a new cookis * //
    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      message: `logged in succcessfully and The cookies has been created  `,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
// * To verify Tokem * //
const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  if(!cookies){
    return res.status(400).json({message:'cookies expired please login again'})
  }
  console.log(`cookies= ${cookies}`);
  const prevToken = cookies.split("=")[1];
  console.log(`prevToken= ${prevToken}`);
  if(!prevToken){
    res.status(400).json({message:`Cookies not found`})
  }
  //* if cookies present then verify the cookies *//
  jwt.verify(prevToken,process.env.JWT_SECRET_KEY,(err,user)=>{
    if(err){
        res.status(400).json({message:`Unable to verify the token `})
    }
    req.id=user.id
    console.log(`REQ.id = ${req.id}`)
  })
   //* hand th control of the code to next middleware  *//
    next()
};
 //* to  getUser only after the tokens are verified  *//
 const getuser=async(req,res)=>{
const userId=req.id
console.log(`userId=\n ${userId}`)
try {
    const user=await authModel.findById(userId,'-password')
    console.log(`user data -= \n ${user}`)
    res.status(200).json({message:`User is found having the Id : ${userId}`,user})
} catch (error) {
    res.status(400).json(error)
}
 }
 /* to regenerate token gain and again if the user is logged in  */
const refreshToken=async(req,res)=>{
    const cookies=req.headers.cookie
    console.log(`cookies = ${cookies}`)
    if(!cookies){
        return res.status (400).json({message:`Token has been expired please login again`})
    }
    const prevToken=cookies.split('=')[1]
    console.log(`token= ${prevToken}`)
    jwt.verify(prevToken,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
           return res.status(400).json(`Unable to verify tokens`)
        }
         /*if no error then we clear our cookies */
         console.log(`user.id = ${user.id}`)
         res.clearCookie(`${user.id}`) 
         console.log(`req.cookies= ${req.cookies[user.id]}`)
         req.cookies[`${user.id}`]=""  
         /* After clearing the token we need to regenerate the token again */
         const regenerateToken=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{
            expiresIn:"35s"
         })
         console.log(`regenerateToken = \n${regenerateToken}`)
         res.cookie(String(user.id),regenerateToken,{
            path:'/',
            expires:new Date(Date.now()+1000*30),
            httpOnly:true,
            sameSite:"lax"
         })
         req.id=user.id
         console.log(`Succeccfully get  id : ${user.id}`)
        //  next()
    })
}
//*  export statements    *//
module.exports = {
  signup,
  login,
  verifyToken,
  getuser,
  refreshToken
};
