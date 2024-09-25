const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Db Conncected Succesfully");
  } catch (error) {
    console.error("Mongodb Connection Error", error);
  }
};

module.exports = connectDb;
