
const { InternalServerError } = require("../../utils/ResponseHelper");
const Hotel = require("../../models/hotel");
const get = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({rate : -1 }).limit(10)
    res.send({hotels})
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
