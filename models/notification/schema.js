const Schema = require("mongoose").Schema;

const notifiSchema = new Schema({
  title: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  message : {
    type : String
  },
  link : { type: String},
},{ timestamps: true });

module.exports = notifiSchema;
