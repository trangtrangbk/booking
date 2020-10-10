const Schema = require("mongoose").Schema;

const hotelSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  customer : { type: String, require: true },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  checkIn : {
    type : Date
  },
  checkOut : {
    type : Date
  },
  cost : {
    type : Number,
    required : true
  },
  status : {
    type : Number,
    required : true
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = hotelSchema;
