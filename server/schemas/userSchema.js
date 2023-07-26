const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String, required: true,
      index: {
        unique: true,
        dropDups: true
      }
    },
    password: { type: String, required: true },
  }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);
