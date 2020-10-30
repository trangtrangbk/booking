const Account = require("../models/accounts");

const insertAccount = async (account) => {
  const acc = new Account(account);
  const result = await acc.save();
  return result;
};
const getAccount = async (params) => {
  return await Account.findOne(params);
};

const getAccounts = async () => {
  return await Account.find(
    {}, {"hash_password": 0,"salt_password": 0});
};
const deleteAccountById = async (id) => {
  return await Account.findByIdAndDelete(id);
};
const changePassword = async (id, newPass) => {
  return await Account.findByIdAndUpdate(id, { hash_password: newPass });
};

const updateAccount = async (id, account) => {
  return await Account.findByIdAndUpdate(id, account, { new: true });
};

module.exports = {
  insertAccount,
  updateAccount,
  getAccount,
  getAccounts,
  deleteAccountById,
  changePassword,
};
