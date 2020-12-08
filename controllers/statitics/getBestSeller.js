
const { InternalServerError } = require("../../utils/ResponseHelper");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const Hotel = require("../../models/hotel");
const get = async (req, res) => {
  try {
    const accountId=req.query.userId;
    const hotel = await Hotel.findOne({accountId})
    if(hotel) {
      const rooms = await Room.find({hotelId : hotel._id})
    const listArr = [];
    rooms.forEach(r => {
      listArr.push(Reservation.countDocuments({hotelId: hotel._id, roomId : r._id}))
    })
    Promise.all(listArr).then(response => {
      res.send({categories : rooms.map(r => r.name),data : response });

    }).catch(e => console.log(e))
    }
    else {
      res.send({categories: [], data: []})
    }
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
