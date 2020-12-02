const { insertReservation } = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const moment = require("moment");

const create = async (req, res) => {
  // const bodyData = req.body;
  const reservation = req.body;
  if (!reservation) return BadRequest(res, "invalid data");
  try {
    const result = await insertReservation({
      ...reservation,
      checkIn: moment(reservation.checkIn, "DD/MM/YYYY").toDate(),
      checkOut: moment(reservation.checkOut, "DD/MM/YYYY").toDate(),
      email: reservation.infor.email,
      phone: reservation.infor.phone,
      note: reservation.infor.note,
      name: reservation.infor.name,
      address: reservation.infor.address,
      status: "waiting",
      hotelId: reservation.hotel._id,
      roomId: reservation.room._id,
    });
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = create;
