import mongoose from "mongoose";

const connectDB = () => {
  return mongoose.connect(
    "mongodb+srv://nftthee:nftthee@cluster0.hov9i7k.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) {
        console.error("Connection to DB failed");
      } else {
        console.log("Connection to DB was successful");
      }
    }
  );
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection failed"));

export default connectDB;
