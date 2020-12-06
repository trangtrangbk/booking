const Admin = require("../models/admin");

const insertAdmin = async (admin) => {
  const acc = new Admin(admin);
  const result = await acc.save();
  return result;
};
const getAdmin = async (params) => {
  return await Admin.findOne(params);
};

const getAdmins = async () => {
  return await Admin.find(
    {}, {"hash_password": 0,"salt_password": 0});
};
const deleteAdminById = async (id) => {
  return await Admin.findByIdAndDelete(id);
};
const changePassword = async (id, newPass) => {
  return await Admin.findByIdAndUpdate(id, { hash_password: newPass });
};

const updateAdmin = async (id, account) => {
  return await Admin.findByIdAndUpdate(id, account, { new: true });
};

module.exports = {
  insertAdmin,
  updateAdmin,
  getAdmin,
  getAdmins,
  deleteAdminById,
  changePassword,
};
