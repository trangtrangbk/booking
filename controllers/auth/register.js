const jwt = require("jsonwebtoken");
const config = require("../../config");
const {
  insertAccount,
  getAccountByEmail,
} = require("../../services/accountService"); 
const { insertUserInfo } = require("../../services/userInforService");
const {
  BadRequest,
  InternalServerError 
} = require("../../utils/ResponseHelper"); 
const { getHashString, getRandomString } = require("../../utils/HashHelper");

const EXISTED_ACCOUNT = "This account existed";

const register = async (req, res) => {
  const {check, isAdmin, role} = req;
  if(check && !isAdmin) return res.status(405).json({msg: 'The role is not authorized to create admin'})
  const bodyData = getAccountFromBodyRequest(req);
  if (!bodyData) return BadRequest(res, "invalid data");
  try {
    const account = await getAccountByEmail(bodyData.email);
    if (account) return BadRequest(res, EXISTED_ACCOUNT);
    bodyData.isAdmin = isAdmin;
    bodyData.role = role;
    const accountData = hashPasswordOfAccount(bodyData);
    const savingAccountResult = await insertAccount(accountData);
    const userInfoData = {
      id_account: savingAccountResult._id,
    };
    const savingUserInfoResult = await insertUserInfo(userInfoData);
    const result = getResponseObject(savingAccountResult, savingUserInfoResult);
    res.status(201).json(result);
  } catch (error) {
    InternalServerError(res);
    console.log(error);  
  }
};

const getResponseObject = (account, userInfo) => {
  return {
    name:account.name,
    email:account.email,
    linked : account.linked,
    isAdmin:account.isAdmin,
    role:account.role,
    join_date: account.createdDay
  };
};

const hashPasswordOfAccount = (account) => {
  const saltPassword = getRandomString();
  const hashPassword = getHashString(account.password, saltPassword);
  const accountData = {
    email:account.email,
    name: account.name,
    isAdmin:account.isAdmin,
    linked : account.linked,
    role:account.role,
    hash_password: hashPassword,
    salt_password: saltPassword,
    status: true
  };
  return accountData;
};

const getAccountFromBodyRequest = (req)=> {
  if (!req.body) return null;
  let { email, name, password, linked } = req.body;
  if (email && password) {
    email=email.trim();
    name = name.trim();
    password = password.trim();
    if (email==""|| name==""||password == "") {
      return null;
    }
    return { email, name,password, linked};
  } else {
    return null;
  }
};

module.exports = register;
