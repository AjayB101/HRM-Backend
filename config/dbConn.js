const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://admin:hrmtwo@employee-module.i3wvpgk.mongodb.net/HRM",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports=connectDB
