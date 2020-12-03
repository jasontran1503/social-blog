const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/my-blog`, {
      // const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected Success');
  } catch (error) {
    console.log(error);
    console.log('MongoDB Connected Fail');
  }
};

module.exports = connectDB;
