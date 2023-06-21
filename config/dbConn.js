const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI,
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
