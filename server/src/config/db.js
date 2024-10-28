const mongoose = require("mongoose");
const ENV = require("./env");

const dbConnect = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
