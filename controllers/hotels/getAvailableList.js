const _ = require("lodash");
const { getHotels } = require("../../services/hotelService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    const {limit, offset,checkIn, checkOut} = JSON.parse(req.query.setting || "{}");
    let arr = await getHotels(filter);
    
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
