const { schema } = require(".");

const Schema = require("mongoose").Schema;

const hotelSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, require: true },
  address: { type: String, require: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: Schema.Types.Array,
  },
  rate: {
    type: Number,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = hotelSchema;
