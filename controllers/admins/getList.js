const _ = require("lodash");
const { getAdmins } = require("../../services/adminService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    let arr = await getAdmins();
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
