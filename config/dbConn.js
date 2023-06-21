const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:hrmtwo@employee-module.i3wvpgk.mongodb.net/HRM",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS:5000,
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
module.exports=connectDB
