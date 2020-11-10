const Schema = require("mongoose").Schema;

const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: { type: String },
  name: { type: String, require: true },
  hash_password: {
    type: String,
    required: true,
  },
  salt_password: {
    type: String,
    required: true,
  },
  status: { type: Boolean, default: true },
},{ timestamps: true });

module.exports = accountSchema;
