const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Classes = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  subject: { type: String, required: true },
  cost: { type: Number, required: true },
});

module.exports = mongoose.model("classes", Classes);
