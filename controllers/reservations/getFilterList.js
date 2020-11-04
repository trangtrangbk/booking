const _ = require("lodash");
const { getReservations } = require("../../services/reservationService");
const { getRoom } = require("../../services/roomService");
const moment = require("moment");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    const { hotelId, status, room, checkInFrom,checkInTo, checkOutFrom,checkOutTo } = filter;
    let filterObj = {
      hotelId : hotelId
    }
    if(status.length > 0) {
      filterObj = {
        ...filterObj,
        status : status
      }
    }
    if(room.length > 0){
      filterObj = {
        ...filterObj,
        roomId : room
      }
    }

    if(checkInFrom) {
      filterObj = {
        ...filterObj,
        checkIn : {'$gte': checkInFrom}
      }
    }

    if(checkInTo) {
      filterObj = {
        ...filterObj,
        checkIn : filterObj.checkIn ? {...filterObj.checkIn,'$lte': checkInTo} : {'$lte': checkInTo}
      }
    }

    if(checkOutFrom) {
      filterObj = {
        ...filterObj,
        checkOut : {'$gte': checkOutFrom}
      }
    }

    if(checkOutTo) {
      filterObj = {
        ...filterObj,
        checkOut : filterObj.checkOut ? {...filterObj.checkOut,'$lte': checkOutTo} : {'$lte': checkOutTo}
      }
    }

    let arr = await getReservations(filterObj);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
