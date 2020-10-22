const _ = require("lodash");
const { getRooms } = require("../../services/roomService");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    let arr = await getRooms(req.body.filter);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
