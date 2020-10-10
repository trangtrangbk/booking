
const { getReservation } = require("../../services/reservationService");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const {id} = req.params
    let arr = await getReservation({_id : id});
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
