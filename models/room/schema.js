const Schema = require("mongoose").Schema;

const roomSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, require: true },
  status: {
    type: Number,
  },
  description: {
    type: String,
  },
  price : Number,
  area : Number,
  image: {
    type: Schema.Types.Array,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = roomSchema;
