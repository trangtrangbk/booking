const _ = require("lodash");
const { getRooms } = require("../../services/roomService");
const moment = require("moment");
const { InternalServerError } = require("../../utils/ResponseHelper");
const { getReservations } = require("../../services/reservationService");

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
const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    const { limit, offset, checkIn, checkOut } = JSON.parse(
      req.query.setting || "{}"
    );
    let rooms = await getRooms(filter);
    const validArr = [];
    const validRooms = [];
    rooms.forEach((room) => validArr.push(checkValid(checkIn,checkOut,room._id)));
    Promise.all(validArr).then(_validArr =>{
      _validArr.forEach((valid,index)=>{
        if(valid) validRooms.push(rooms[index])
      })
      res.send(groupBy(validRooms,"hotelId"))
    }).catch(err => {
      console.log(err);
      InternalServerError(res);
    });
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
