
const { InternalServerError } = require("../../utils/ResponseHelper");
const Room = require("../../models/room");
const Reservation = require("../../models/reservation");
const Rating = require("../../models/ratings");
const Hotel = require("../../models/hotel")
const get = async (req, res) => {
  try {
    const accountId=req.query.userId;
    const hotel = await Hotel.findOne({accountId})
    if(hotel) {
      const rooms = await Room.countDocuments({hotelId : hotel._id})
      const reservations = await Reservation.find({hotelId : hotel._id})
      const ratings = await Rating.find({hotelId : hotel._id})
      let revenue = 0;
      reservations.map(re => {
        revenue+= re.cost
      })
      res.send({rooms, reservations: reservations.length, ratings, revenue});
    }
   else res.send({rooms:0, reservations:0, ratings : [], revenue:0})
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
