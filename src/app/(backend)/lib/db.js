import mongoose from 'mongoose';

const connectDB = async () => {
  // if (mongoose.connection.readyState >= 1) return;

  // await mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  try {
    mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to Mongodb.")
  } catch (error) {
    console.log(error)
  }
};

export default connectDB;