const { deleteReservationById } = require("../../services/reservationService");
const {
    InternalServerError,
    NotFound,Ok
  } = require("../../utils/ResponseHelper");

const del = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteReservationById(id);
    if(!result) return NotFound(res, id+" is not found");
    Ok(res, "Deleted");
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = del;
