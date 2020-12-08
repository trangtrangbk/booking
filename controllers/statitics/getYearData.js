const { countNewsByMonth } = require("../../services/statisticsService");
const {
  InternalServerError,
  BadRequest,
} = require("../../utils/ResponseHelper");
const Hotel = require("../../models/hotel");
const getByMonth = async (req, res) => {
  try {
    const accountId = req.query.userId;
    const year = req.query.year;
    console.log({ year });
    const hotel = await Hotel.findOne({ accountId });
    if(hotel) {
      const result = await countNewsByMonth(hotel._id, year);
      res.send(result);
    }
    else
    res.send({year : "2020", data : []});
  } catch (error) {
    console.log(error);
    InternalServerError(res);
  }
};

module.exports = getByMonth;
