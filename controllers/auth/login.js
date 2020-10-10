const jwt = require("jsonwebtoken");
const config = require("../../config");
const { getHashString } = require("../../utils/HashHelper");
const {
  BadRequest,
  InternalServerError,
  Unauthorized
} = require("../../utils/ResponseHelper"); 
const { getAccount } = require("../../services/accountService");

const DefNoRememberTime = config.DEF_EXP_SHORT;
const DefRememberTime = config.DEF_EXP_LONG;
const WrongAccountMsg = "Wrong email or password";
const LockedUser = "you are blocked, please contact admin for more detail!";

const login = async (req, res) => {
  let { email, password, remember,  } = req.body;
  if (!email || !password) return BadRequest(res);
  try {
    const account = await getAccount({email});
    if (account && isMatchPassword(account, password)) {
      if(!account.status) return Unauthorized(res, LockedUser);
      if(account.isAdmin===true) return BadRequest(res);
      responseUserSession(res, account, remember);
    } else {
      Unauthorized(res, WrongAccountMsg);
    }
  } catch (err) {
    console.log(err)
    InternalServerError(res);
  }
};  

//Support function
const createToken = (user, expireTime = DefNoRememberTime) => {
  console.log(config.SECRET_WORD);
  return jwt.sign(
    { name: user.name, id: user._id, email: user.email, isAdmin:user.isAdmin, role: user.role },
    config.SECRET_WORD,
    {
      expiresIn: expireTime
    }
  );
};

const isMatchPassword = (user, password) => {
  const hashPassword = getHashString(password, user.salt_password);
  if (hashPassword === user.hash_password) {
    return true;
  }
  return false;
};

const responseUserSession = (res, user, remember) => {
  const { name , _id:id, email, isAdmin , role } = user;
  const expireTime = remember ? DefRememberTime : DefNoRememberTime;
  res.json({ token: createToken(user, expireTime), name, id, email, isAdmin ,role });
};

module.exports = login;
