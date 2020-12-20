const { insertReservation } = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const moment = require("moment");

const isBetween = (date, min, max) => date >= min && date <= max;

const checkValid = async (start, end, roomId) => {
  let result = true;
  try {
    const checkIn = moment(start).format("YYYY-MM-DD");
    const checkOut = moment(end).format("YYYY-MM-DD");

    let reservations = await getReservations({ roomId });
    reservations = reservations.filter((r) => r.status !== "canceled");
    reservations.forEach((r) => {
      const start = moment(r.checkIn).format("YYYY-MM-DD");
      const end = moment(r.checkOut).format("YYYY-MM-DD");
      if (
        isBetween(checkIn, start, end) ||
        isBetween(checkOut, start, end) ||
        (isBetween(start, checkIn, checkOut) &&
          isBetween(end, checkIn, checkOut))
      ) {
        result = false;
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const create = async (req, res) => {
  // const bodyData = req.body;
  const reservation = req.body;
  if (!reservation) return BadRequest(res, "invalid data");
  try {
    if (
      checkValid(
        reservation.checkIn,
        reservation.checkOut,
        reservation.room._id
      )
    ) {
      const result = await insertReservation({
        ...reservation,
        checkIn: moment(reservation.checkIn, "DD/MM/YYYY").toDate(),
        checkOut: moment(reservation.checkOut, "DD/MM/YYYY").toDate(),
        email: reservation.infor.email,
        phone: reservation.infor.phone,
        note: reservation.infor.note,
        name: reservation.infor.name,
        address: reservation.infor.address,
        status: "confirmed",
        hotelId: reservation.hotel._id,
        roomId: reservation.room._id,
      });
      res.status(201).json(result);
    } else {
      res.status(500).json({ status: "error", message: "Invalid date." });
    }
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = create;
