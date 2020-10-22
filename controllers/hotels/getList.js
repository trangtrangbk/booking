const _ = require("lodash");
const { getHotels } = require("../../services/hotelService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    let arr = await getHotels(req.body.filter);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
