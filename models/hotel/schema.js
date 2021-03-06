const Schema = require("mongoose").Schema;

const hotelSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, require: true },
  address: { type: String, require: true },
  city: { type: String, require: true },
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
  image: 
    [{
      type: String
  }]
  ,
  amenities: [
    {
      type: String,
    },
  ],
  rate: {
    type: Number,
  },
},{ timestamps: true });

module.exports = hotelSchema;
