const { insertReservation } = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");

const create = async (req, res) => {
  const bodyData = req.body;
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const result = await insertReservation(bodyData);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};


module.exports = create;
