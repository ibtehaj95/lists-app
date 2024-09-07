const mongoose = require('mongoose');
const {ServiceUnavailableError} = require("../errors");

const connectDB = async (url) => {
  try {
    return await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new ServiceUnavailableError(`Failed to connect to MongoDB: ${error.message}`);
  }
}

module.exports = connectDB
