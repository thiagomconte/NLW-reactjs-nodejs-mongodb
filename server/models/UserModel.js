const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  whatsapp: { type: String, required: true },
  bio: { type: String, required: true },
});

module.exports = mongoose.model("users", User);
