
const { getRoom } = require("../../services/roomService");
const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const {id} = req.params
    let arr = await getRoom({_id : id});
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
