const Schema = require("mongoose").Schema;

const RatingSchema = new Schema({
  hotelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
},{ timestamps: true });

module.exports = RatingSchema;
