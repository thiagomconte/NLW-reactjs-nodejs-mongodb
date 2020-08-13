const mongoose = require("mongoose");
const moment = require('moment');
const Schema = mongoose.Schema;

const Connection = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  created_at:{type: Date, default: moment(Date.now()).toLocaleString({timeZone:"America/Sao_Paulo"})}
});

module.exports = mongoose.model("connections", Connection);