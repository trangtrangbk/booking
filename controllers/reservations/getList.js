const _ = require("lodash");
const { getReservations } = require("../../services/reservationService");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    let arr = await getReservations();
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
