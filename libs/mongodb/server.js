import mongoose from "mongoose";

const server = async () => {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("Connected to Database!");
  } catch (err) {
    console.log(err);
  }
};

export default server;
