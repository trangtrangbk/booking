const mongoose = require("mongoose");

module.exports = mongoose.model("Reservation", require("./schema"));
