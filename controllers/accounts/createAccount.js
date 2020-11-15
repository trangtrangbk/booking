const { insertAccount, getAccount } = require("../../services/accountService");
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
    const account = await getAccount({ email: bodyData.email });
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    const accountData = hashPasswordOfAccount(bodyData);
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
    hash_password: hashPassword,
    avatar : account.avatar,
    linked : account.linked,
    salt_password: saltPassword,
    status: true,
  };
  return accountData;
};

const getAccountFromBodyRequest = (req) => {
  if (!req.body) return null;
  let { email, name, password, avatar,linked } = req.body;
  if (email && password) {
    email = email.trim();
    name = name.trim();
    password = password.trim();
    if (email == "" || name == "" || password == "") {
      return null;
    }
    return { email, name, password,avatar,linked };
  } else {
    return null;
  }
};

module.exports = register;
