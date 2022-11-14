const mongoose = require("mongoose");

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

const SecondPair = mongoose.model("JpyGbp", JpyGbp);
module.exports = { SecondPair };
