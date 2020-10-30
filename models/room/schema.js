const Schema = require("mongoose").Schema;

const roomSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, require: true },
  status: {
    type: String,
  },
  description: {
    type: String,
  },
  price: Number,
  area: Number,
  amenities: [
    {
      type: String,
    },
  ],
  rules: [
    {
      type: String,
    },
  ],
  image: [
    {
      type: String,
    },
  ],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = roomSchema;
