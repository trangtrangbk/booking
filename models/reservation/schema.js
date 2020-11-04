const Schema = require("mongoose").Schema;

const hotelSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  cancelReason : {
    type : String
  },
  customer : { type: String, require: true },
  email: {
    type: String,
    required: true,
  },
  guests : {
    type : Object
  },
  code : {
    type : String
  },
  phone: {
    type: String,
  },
  note : {
    type : String
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
    type : String,
    required : true
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

module.exports = hotelSchema;
