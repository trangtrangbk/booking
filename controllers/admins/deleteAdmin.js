const { deleteAdminById, getAdmin } = require("../../services/adminService");
const {
    InternalServerError,
    BadRequest,
    NotFound,Ok
  } = require("../../utils/ResponseHelper");

const del = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = getAdmin({_id : id})
    if(admin.role === "SuperAdmin") {
      return InternalServerError({message : "Forbidden"})
    }
    const result = await deleteAdminById(id);
    if(!result) return NotFound(res, id+" is not found");
    Ok(res, "Deleted");
  } catch (error) {
    console.log(error)
    InternalServerError(res);
  }
};

module.exports = del;
