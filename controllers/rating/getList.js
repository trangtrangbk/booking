const _ = require("lodash");
const { getRatings } = require("../../services/ratingService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    let arr = await getRatings(filter);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
