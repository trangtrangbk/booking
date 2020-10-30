const _ = require("lodash");
const { getAccount } = require("../../services/accountService");

const { InternalServerError } = require("../../utils/ResponseHelper");

const get = async (req, res) => {
  try {
    const {id} = req.params
    let arr = await getAccount({_id : id});
    delete arr._doc.hash_password;
    delete arr._doc.salt_password;
    res.send(arr);
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
