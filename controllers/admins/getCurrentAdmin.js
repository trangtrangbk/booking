const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { getAdmin } = require("../../services/adminService");
const { InternalServerError } = require("../../utils/ResponseHelper");
const config = require("../../config");

const getCurrentAcc = async (req, res) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRET_WORD, async (err, decoded) => { 
        let arr = await getAdmin({_id : decoded.id});
        delete arr._doc.hash_password;
        delete arr._doc.salt_password;
        res.send({account:arr});
      })}
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = getCurrentAcc;
