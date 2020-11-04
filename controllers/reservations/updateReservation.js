const {
  updateReservation,
  getReservation,
} = require("../../services/reservationService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");

const update = async (req, res) => {
  const bodyData = req.body;
  const { id } = req.params;
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const oldReservation = await getReservation({ _id: id });
    const html = `<div style="font-size: 16px">
    <p>Your reservation has been ${bodyData.status} by hotel manager.</p>
    ${
      bodyData.status === "canceled"
        ? `<span style="font-weight: 600">Reason: </span> <span>${bodyData.cancelReason}</span>`
        : "Please inform if you have any request. Thanks"
    }
    </div>
    `;
    if (oldReservation.status !== bodyData.status) {
      sendMail(
        bodyData.email,
        `Your reservation has been ${bodyData.status}`,
        `Your reservation has been ${bodyData.status}`,
        html
      );
    }
    const result = await updateReservation(id, bodyData);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = update;
