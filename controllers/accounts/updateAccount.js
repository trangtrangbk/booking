const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const { updateAccount } = require("../../services/accountService");

const update = async (req, res) => {
  const bodyData = req.body;
  const {id} = req.params;
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const result = await updateAccount(id,bodyData);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

module.exports = update;
