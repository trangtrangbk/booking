const { insertAdmin, getAdmin } = require("../../services/adminService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const { getHashString, getRandomString } = require("../../utils/HashHelper");

const EXISTED_ACCOUNT = "This email has been used for another account";

const register = async (req, res) => {
  const bodyData = getAccountFromBodyRequest(req);
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const admin = await getAdmin({ email: bodyData.email });
    if (admin) return BadRequest(res, EXISTED_ACCOUNT);
    const adminData = hashPasswordOfAccount(bodyData);
    const result = await insertAdmin(adminData);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);
  }
};

const hashPasswordOfAccount = (account) => {
  const saltPassword = getRandomString();
  const hashPassword = getHashString(account.password, saltPassword);
  const accountData = {
    email: account.email,
    name: account.name,
    isAdmin : true,
    hash_password: hashPassword,
    role : account.role,
    avatar : account.avatar,
    salt_password: saltPassword,
    status: true,
  };
  return accountData;
};

const getAccountFromBodyRequest = (req) => {
  if (!req.body) return null;
  let { email, name, password, avatar, role } = req.body;
  if (email && password) {
    email = email.trim();
    name = name.trim();
    password = password.trim();
    if (email == "" || name == "" || password == "") {
      return null;
    }
    return { email, name, password,avatar, role };
  } else {
    return null;
  }
};

module.exports = register;
