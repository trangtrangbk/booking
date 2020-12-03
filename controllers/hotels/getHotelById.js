const { getHotel } = require("../../services/hotelService");
const {getRooms} = require("../../services/roomService")
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const {id} = req.params
    let arr = await getHotel({_id : id});
    const rooms = await getRooms({hotelId : arr._id})
    res.send({...arr._doc, rooms: rooms.length, });
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
