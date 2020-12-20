const {
  getReservation, getReservations,
} = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
  Ok,
} = require("../../utils/ResponseHelper");
const moment = require("moment")

const isBetween = (date, min, max) => (date >= min && date <= max);

const checkValid = async (req, res) => {
  const bodyData = req.body;
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const roomId = req.body.roomId;
    const checkIn = moment(req.body.checkIn).format('YYYY-MM-DD')
    const checkOut =  moment(req.body.checkOut).format('YYYY-MM-DD')

    let reservations = await getReservations({roomId})
    reservations = reservations.filter(r => r.status !== "canceled")
    reservations.forEach(r =>{
      const start = moment(r.checkIn).format('YYYY-MM-DD')
      const end =  moment(r.checkOut).format('YYYY-MM-DD')
      if(isBetween(checkIn, start, end) || isBetween(checkOut, start, end) || (isBetween(start, checkIn, checkOut) && isBetween(end, checkIn, checkOut))) {
        res.status(500).json({validate : "not ok"})
      }      
    })
    res.status(200).json({validate : "ok"})
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = checkValid;
