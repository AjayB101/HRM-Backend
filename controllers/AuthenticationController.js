/* ================================================ import statements ============================================================*/
const authModel = require("../model/Authentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');

// * ====================================    Signup    ===========================================================================* //
const sendWelcomeEmail = async (
  email,
  password,
  verificationToken,
  firstname,
  lastname
) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
		secure: true,
		tls: {
      rejectUnauthorized: false,
		},
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const verificationLink = `https://hrm-backend-square.onrender.com/auth/verify/${verificationToken}`;

  const mailOptions = {
    from: "careers@snssquare.com",
    to: email,
    subject:
      "Welcome to SNS Square! Find Your HR Management Tool Credentials",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            
            .container {
                width: 400px;
                margin: 20px auto;
                padding: 20px;
                border: 1px solid #ccc;
            }
            
            h2 {
                text-align: center;
            }
            
            p {
                margin-bottom: 10px;
            }
            
            .credential {
                background-color: #f9f9f9;
                padding: 10px;
                border: 1px solid #ccc;
            }
            
            .verify-link {
                text-align: center;
                margin-top: 20px;
            }
            
            .verify-link a {
                display: inline-block;
                padding: 10px 20px;
                background-color: #f44336;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
            
            .verify-link a:hover {
                background-color: #c62828;
            }
            .footer {
              text-align: center;
          }
  
          .company-name {
              color: #555;
              font-weight: bold;
          }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Email Verification</h2>
            <p>Dear ${firstname}  ${lastname}</p>
            <p>Welcome to SNS Square Consultancy Services Pvt Ltd!
            We are delighted to have you on board. As part of your onboarding, we are pleased to provide you with the credentials for our Task Management Tool:</p>
            <div class="credential">
                <p>Your credentials:</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
            </div>
            <div class="verify-link">
                <a href="${verificationLink}">Verify Email</a>
            </div>
            <p>This tool will help you organize and track your tasks efficiently. We're excited to work with you and wish you a successful journey at SNS Square Consultancy Services Pvt Ltd!</p>

            <p>Best regards,</p>
            <p class="company-name">HR Team<br>SNS Square Consultancy Services Pvt Ltd!</p>
        </div>
        <div class="footer">
            <p>IT Services and IT Consulting Coimbatore, TN | Phone: | Email: careers@snssquare.com</p>
        </div>
    </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent!");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const signup = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

	if (!passwordRegex.test(password)) {
			return res.status(400).json({
					message: "Password must contain at least one lowercase, one uppercase, one numeric, one special character, and be at least 8 characters long.",
			});
	}

	const user = await authModel.findOne({ email });

	if (user) {
			return res.status(400).json({ message: "This email already exists" });
	}

	try {
			const hashedPass = bcrypt.hashSync(password, 10);
			const verificationToken = uuidv4();
			const newUser = new authModel({
					firstname,
					lastname,
					email,
					password: hashedPass,
					role: "user",
					verificationToken,
			});
			
			// Save the new user to the database
			await newUser.save();

			// Send welcome email
			await sendWelcomeEmail(
					email,
					password,
					verificationToken,
					firstname,
					lastname
			);

			// Respond with a success message
			res.status(201).json({
					message: "User has been created successfully",
					newUser: newUser.toObject(),  // Convert Mongoose document to plain JavaScript object
			});
	} catch (error) {
			console.error("Error during user creation:", error);
			res.status(500).json({ error: "Internal Server Error", message: error.message });
	}
};

// *=============================     Login     =========================================================================================//

const login = async (req, res) => {
	const { email, password } = req.body;
	// * Checing if email exist aldready if not throw error  * //
	const existingUser = await authModel
	.findOne({ email })
	.exec()
	.then((res) => (data = res));
if (!existingUser) {
	return res
		.status(400)
		.json({ message: `Email Id doesn't exist. Please SignUp` });
}

if (!existingUser.verified) {
	return res
		.status(400)
		.json({
			message: `Email is not verified. Please verify your email first.`,
		});
}
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
			expires: new Date(Date.now() + 1000 * 30 * 90 * 90 * 90),
			httpOnly: true,
			sameSite: "lax",
		});
		return res.status(200).json({
			message: `logged in succcessfully and The cookies has been created  `,
			existingUser,
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
// * ==========================    Middleware   To verify Token *==================================================================================/

const verifyToken = async (req, res, next) => {
	const cookies = req.headers.cookie;
	if (!cookies) {
		return res
			.status(400)
			.json({ message: "cookies expired please login again" });
	}
	console.log(`cookies= ${cookies}`);
	const prevToken = cookies.split("=")[1];
	console.log(`prevToken= ${prevToken}`);
	if (!prevToken) {
		res.status(400).json({ message: `Cookies not found` });
	}
	//* if cookies present then verify the cookies *//
	jwt.verify(prevToken, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) {
			res.status(400).json({ message: `Unable to verify the token ` });
		}
		req.id = user.id;
		console.log(`REQ.id = ${req.id}`);
	});
	//* handover  the control of the code to next middleware  *//
	next();
};
//*=========================== to  getUser details only after the tokens are verified ================================================== *//

const getuser = async (req, res) => {
	const userId = req.id;
	console.log(`userId=\n ${userId}`);
	try {
		const user = await authModel.findById(userId, "-password");
		console.log(`user data -= \n ${user}`);
		res
			.status(200)
			.json({ message: `User is found having the Id : ${userId}`, user });
	} catch (error) {
		res.status(400).json(error);
	}
};
const getusers = async (req, res) => {
	try {
		const user = await authModel.find({});
		res
			.status(200)
			.json({ message: "Data Has Been Fetched From The Server", user });
	} catch (error) {
		res.status(400).json(error);
	}
};
/* ============================== to regenerate token gain and again if the user is logged in  ====================================*/

const refreshToken = async (req, res, next) => {
	try {
		const cookies = req.headers.cookie;
		console.log(`cookies = ${cookies}`);
		if (!cookies) {
			return res
				.status(400)
				.json({ message: `Token has been expired please login again` });
		}
		const prevToken = cookies.split("=")[1];
		console.log(`token= ${prevToken}`);
		jwt.verify(prevToken, process.env.JWT_SECRET_KEY, (err, user) => {
			if (err) {
				return res.status(400).json(`Unable to verify tokens`);
			}
			/*if no error then we clear our cookies */
			console.log(`user.id = ${user.id}`);
			res.clearCookie(`${user.id}`);
			console.log(`req.cookies= ${req.cookies[user.id]}`);
			req.cookies[`${user.id}`] = "";
			/* After clearing the token we need to regenerate the token again */
			const regenerateToken = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: "35s",
				}
			);
			console.log(`regenerateToken = \n${regenerateToken}`);
			/*creating new token on server side */
			res.cookie(String(user.id), regenerateToken, {
				path: "/",
				expires: new Date(Date.now() + 1000 * 30),
				httpOnly: true,
				sameSite: "lax",
			});
			req.id = user.id;
			console.log(`Succeccfully get  id : ${user.id}`);
			next();
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
/*========================================== To logout from the page ===================================================================*/
const logout = async (req, res) => {
	/*clearing coookies will automaticallly logout the user*/
	try {
		const cookie = req.headers.cookie;
		console.log(`Cookies= ${cookie}`);
		if (!cookie) {
			return res.status(400).json({ message: `Cookies expired login again` });
		}
		const token = cookie.split("=")[1];
		console.log(`token = ${token}`);
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
			if (err) {
				return res.status(400).json({ message: `Unable to Verify Token` });
			}
			console.log(`user id = ${decodedToken.id}`);
			res.clearCookie(`${decodedToken.id}`);
			req.cookies[`${decodedToken.id}`] = "";
			res.status(200).json({ message: `Logout successfully` });
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
const updateAuth = async (req, res) => {
	const { id } = req.params;
	const user = authModel.findById(id).exec();
	if (!user) {
		res.status(400).json({ message: `There is no user with id ${id}` });
	}
	try {
		await authModel
			.findByIdAndUpdate(id, { $set: req.body })
			.then((data) => {
				res
					.status(200)
					.json({ message: `User is updated having id ${id}`, data });
			})
			.catch((err) => res.status(400).json(err));
	} catch (error) {
		res.status(500).json(error);
		console.log(error);
	}
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await authModel.findOne({ verificationToken: token });

    if (!user) {
      // User not found with the given token
      return res.status(404).send(generateVerificationFailedPage());
    }

    if (user.verified) {
      // User is already verified
      return res.status(200).send(generateAlreadyVerifiedPage());
    }

    // Mark the user as verified and clear the verification token
    user.verified = true;
    // user.verificationToken = "";

    user.role = "User";
    await user.save();

    // Send the successful verification page
    return res.status(200).send(generateVerificationSuccessfulPage());
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json(error);
  }
};

// Function to generate the "Email Verification Failed" page
const generateVerificationFailedPage = () => {
  return 
  const htmlInvalid = `<!DOCTYPE html>
    <html>
    <head>
      <title>Email Verification - Unsuccessful</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f8f8f8;
        }
    
        .container {
          background-color: #fff;
          border-radius: 5px;
          padding: 30px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
    
        h2 {
          color: #ff0000;
          margin-bottom: 20px;
        }
    
        p {
          margin-bottom: 20px;
        }
    
        button {
          padding: 10px 20px;
          background-color: #ff0000;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Verification Failed</h2>
        <p>Sorry, your email verification was unsuccessful.</p>
        <button>Resend Verification Email</button>
      </div>
    </body>
    </html>`;
};

// Function to generate the "Email Already Verified" page
// Function to generate the "Email Already Verified" page
const generateAlreadyVerifiedPage = () => {
  console.log("generateAlreadyVerifiedPage function called"); // Add this line
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Already Verified</title>
      <!-- Add your CSS styles here -->
    </head>
    <body>
      <div class="container">
        <h2>Email Already Verified</h2>
        <p>Your email has already been verified.</p>
      </div>
    </body>
    </html>
  `;
};


// Function to generate the "Email Verification Successful" page
const generateVerificationSuccessfulPage = () => {
  return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Email Verification Success</title>
			<style>
					body {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 100vh;
							margin: 0;
							background-color: #f2f2f2;
					}
	
					.container {
							background-color: #fff;
							padding: 50px;
							border-radius: 5px;
							text-align: center;
							box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
					}
	
					h1 {
							margin-bottom: 20px;
					}
	
					p {
							font-size: 18px;
					}
	
					.success-icon {
							font-size: 80px;
							margin-bottom: 20px;
							color: #00cc00;
					}
	
					.btn {
							display: inline-block;
							padding: 10px 20px;
							background-color: #4caf50;
							color: #fff;
							text-decoration: none;
							border-radius: 5px;
							font-size: 16px;
							transition: background-color 0.3s ease;
					}
	
					.btn:hover {
							background-color: #45a049;
					}
			</style>
	</head>
	<body>
			<div class="container">
					<i class="success-icon">&#10004;</i>
					<h1>Email Verification Successful</h1>
					<p>Your email has been verified successfully.</p>
					<a href="https://hrm-backend-square.onrender.com/auth/login" class="btn">Continue</a>
			</div>
	</body>
	</html>
	 `;
};

//===============================   export statements  ==================================================================   *//

module.exports = {
	signup,
	login,
	verifyToken,
	getuser,
	refreshToken,
	logout,
	getusers,
	updateAuth,
	verifyEmail,
};
