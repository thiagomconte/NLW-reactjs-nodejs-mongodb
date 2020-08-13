const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassSchedule = new Schema({
  class_id: { type: Schema.Types.ObjectId, ref: "classes", required: true },
  week_day: { type: Number, required: true },
  from: { type: Number, required: true },
  to: { type: Number, required: true },
});

module.exports = mongoose.model("classSchedules", ClassSchedule);