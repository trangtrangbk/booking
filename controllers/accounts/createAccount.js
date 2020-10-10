const { insertAccount, getAccount } = require("../../services/accountService");
const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const { getHashString, getRandomString } = require("../../utils/HashHelper");

const EXISTED_ACCOUNT = "This account existed";

const register = async (req, res) => {
  const bodyData = getAccountFromBodyRequest(req);
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const account = await getAccount({ email: bodyData.email });
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    const accountData = hashPasswordOfAccount(bodyData);
    console.log(accountData);
    const result = await insertAccount(accountData);
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
    isAdmin: account.isAdmin,
    role: account.role,
    hash_password: hashPassword,
    salt_password: saltPassword,
    status: true,
  };
  return accountData;
};

const getAccountFromBodyRequest = (req) => {
  if (!req.body) return null;
  let { email, name, password } = req.body;
  if (email && password) {
    email = email.trim();
    name = name.trim();
    password = password.trim();
    if (email == "" || name == "" || password == "") {
      return null;
    }
    return { email, name, password };
  } else {
    return null;
  }
};

module.exports = register;
