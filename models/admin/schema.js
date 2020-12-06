const Schema = require("mongoose").Schema;

const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: { type: String },
    role: { type: String },
    name: { type: String},
    hash_password: {
      type: String,
      required: true,
    },
    salt_password: {
      type: String,
      required: true,
    },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = accountSchema;
