const _ = require("lodash");
const { getReservations } = require("../../services/reservationService");
const { getRoom } = require("../../services/roomService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    console.log(filter);
    let arr = await getReservations(filter);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
