const {} = require("../../utils/HashHelper");
const jwt = require("jsonwebtoken");
const {
  InternalServerError,
  Unauthorized,
  Ok
} = require("../../utils/ResponseHelper");  
const config = require("../../config");
const {getAccountById } = require("../../services/accountService");
// const {getUserInfoById} = require('../../services/userInforService')
const LockedUser = "you are blocked, please contact admin for more detail!";

const auth = async (req, res) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("JWT ")) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRET_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        const {status} = await getAccountById(decoded.id);
        // const user = await getUserInfoById(decoded.id);

        if (!status) return Unauthorized(res, LockedUser);
        
       const resultUser = {
         "name": decoded.name,
         "email": decoded.email,
         "address": user.address,
         "phoneNumber": user.phoneNumber,
         "gender":user.gender,
         "avatar":user.avatar,
         "birthday":user.birthday,
         "isAdmin":decoded.isAdmin,
         "role":decoded.role,
         "createdDay":user.createdDay
       }
       return res.status(201).json({msg:'oke',resultUser})
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

module.exports = auth;
