
const { InternalServerError } = require("../../utils/ResponseHelper");
const Hotel = require("../../models/hotel");
const Account = require("../../models/accounts");
const Admin = require("../../models/admin");
const get = async (req, res) => {
  try {
    const hotels = await Hotel.countDocuments();
    const accounts = await Account.countDocuments();
    const admins = await Admin.countDocuments();
    res.send({hotels,accounts, admins});
  } catch (e) {
    console.log(e);
    InternalServerError(res);
  }
};

module.exports = get;
