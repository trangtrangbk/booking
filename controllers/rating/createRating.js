const { updateHotel } = require("../../services/hotelService");
const { insertRating, getRatings } = require("../../services/ratingService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");

const create = async (req, res) => {
  // const bodyData = req.body;
  const rating = req.body;
  if (!rating) return BadRequest(res, "invalid data");
  try {
    const result = await insertRating({
      ...rating,
    });
    const ratingHotl = await getRatings({hotelId: rating.hotelId})
    let count = 0;
    ratingHotl.forEach(el => {
      count +=el.rate
    });
    await updateHotel(rating.hotelId, {rate: (count/ratingHotl.length).toFixed(1)})
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = create;
