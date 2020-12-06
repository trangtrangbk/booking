const _ = require("lodash");
const { getAdmin } = require("../../services/adminService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const getAccountByEmail = async (req, res) => {
  try {
    let arr = await getAdmin({ email: req.query.email });
    if (arr) {
      delete arr._doc.hash_password;
      delete arr._doc.salt_password;
    }
    res.send({ account: arr });
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = getAccountByEmail;
