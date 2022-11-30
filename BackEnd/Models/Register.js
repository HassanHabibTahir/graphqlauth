import mongoose from "mongoose";

const { Schema } = mongoose;

const JpyGbp = new Schema({
  email: {
    type: String,
    unique: true,
  },
  user_name: { type: String },
  first_name: { type: String },
  second_name: { type: String },
  password: { type: String },
});

export const SecondPair = mongoose.model("JpyGbp", JpyGbp);
