const _ = require("lodash");
const { getAccount } = require("../../services/accountService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const getAccountByEmail = async (req, res) => {
  try {
    let arr = await getAccount({ email: req.query.email });
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
