const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  Forbidden,
  InternalServerError,
  Unauthorized
} = require("../utils/ResponseHelper");
const LockedUser = "you are blocked, please contact admin for more detail!";
const { getAccount } = require("../services/accountService");
const { getHotel } = require("../services/hotelService");
const { getAdmin } = require("../services/adminService");

const requiredLogin = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRET_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        req.decoded = decoded;
        let user = await getAccount({_id :decoded.id});
        if(decoded.isAdmin) {
          user =  await getAdmin({_id :decoded.id});
        }
        if (!user.status) return Unauthorized(res, LockedUser);
        next();
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

const requiredHotelOwner = async (req, res, next) => {
  requiredLogin(req, res, async () => {

    try {
      const hotel = await getHotel({_id : req.body.hotelId || req.query.hotelId})
      if (req.decoded.id == hotel.accountId) {
        next();
      } else {
        return Forbidden(res, "This action requires owner!");
      }
    } catch (e) {
      console.log(e);
      InternalServerError(res);
    }
  });
};


const requiredAccOwner = async (req, res, next) => {
  requiredLogin(req, res, async () => {
    try {
      const {id} = req.params
      if (req.decoded.id == id) {
        next();
      } else {
        return Forbidden(res, "This action requires owner!");
      }
    } catch (e) {
      console.log(e);
      InternalServerError(res);
    }
  });
};


const requiredAdmin = async (req, res, next) => {
  console.log('requiredAdmin')
  requiredLogin(req, res, async () => {
    try {
      const { isAdmin } = req.decoded;
      if (isAdmin===true) {
        next();
      } else {
        return Forbidden(res, "This action requires admin role!");
      }
    } catch (e) {
      console.log("REQUIRED ADMIN ERROR", e);  
      InternalServerError(res);
    }
  });
};

module.exports = { requiredLogin, requiredHotelOwner, requiredAccOwner, requiredAdmin};
