const {
  BadRequest,
  InternalServerError,
} = require("../../utils/ResponseHelper");
const { changePassword, getAccount } = require("../../services/accountService");
const { getHashString } = require("../../utils/HashHelper");

const update = async (req, res) => {
  const bodyData = req.body;
  const {id} = req.params;
  const account = await  getAccount({_id : id})
  if(account) {
    const hashPassword = getHashString(bodyData.old_pass, account.salt_password);
    if(hashPassword === account.hash_password) {
      try {
        const result = await changePassword(id,bodyData.new_pass);
        res.status(201).json(result);
      } catch (error) {
        InternalServerError(res);
        console.log(error);
      }
    }
    else {
      res.status(500).json({message : "wrong password!"});  
    }
  }
  else {
      res.status(500).json({message : "account not found!"});  
  }
  
};

module.exports = update;
