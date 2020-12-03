const _ = require("lodash");
const { getRooms } = require("../../services/roomService");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const filter = JSON.parse(req.query.filter || "{}");
    const { limit, offset } = JSON.parse(req.query.setting || "{}");
    let arr = await getRooms(filter, limit, offset);
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
