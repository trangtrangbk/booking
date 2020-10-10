const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  Forbidden,
  InternalServerError,
  Unauthorized
} = require("../utils/ResponseHelper");
const { getUserRoleById } = require("../services/accountService");
const LockedUser = "you are blocked, please contact admin for more detail!";
const { getAccountById } = require("../services/accountService");

const requiredLogin = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("JWT ")) {
      token = token.split(" ")[1];
    }
    if (token) {
      jwt.verify(token, config.SECRET_WORD, async (err, decoded) => {
        if (err) {
          return Unauthorized(res, "Invalid Token!");
        }
        req.decoded = decoded;
        const {status} = await getAccountById(decoded.id);
        if (!status) return Unauthorized(res, LockedUser);
        next();
      });
    } else Forbidden(res, "Not found Token !");
  } catch (e) {
    console.log("REQUIRED LOGIN ERROR", e);
    InternalServerError(res);
  }
};

// const requiredOwner = async (req, res, next) => {
//   console.log('requiredOwner')
//   requiredLogin(req, res, async () => {
//     try {
//       const { isAdmin } = await getUserRoleById(req.decoded.id);
//       //console.log(isAdmin);
//       if (isAdmin===true) {
//         next();
//       } else {
//         return Forbidden(res, "This action requires admin role!");
//       }
//     } catch (e) {
//       console.log("REQUIRED ADMIN ERROR", e);  
//       InternalServerError(res);
//     }
//   });
// };

// const requiredAdmin = async (req, res, next) => {
//   console.log('requiredAdmin')
//   requiredLogin(req, res, async () => {
//     try {
//       const { isAdmin } = await getUserRoleById(req.decoded.id);
//       //console.log(isAdmin);
//       if (isAdmin===true) {
//         next();
//       } else {
//         return Forbidden(res, "This action requires admin role!");
//       }
//     } catch (e) {
//       console.log("REQUIRED ADMIN ERROR", e);  
//       InternalServerError(res);
//     }
//   });
// };
// const checkRole = async (req, res, next ) => {
//   const {maRole} = req;
//   const {role} = req.decoded;
//   let status = false;
//   console.log(role, '___', maRole)
//   // role.map(item =>{
//   //   maRole.map( iRole =>{
//   //     item === iRole? status =true: status= false});
//   // })
//   // if(status) next();
//   // else return res.status(405).json({msg: 'Method not Allow'})
//   role.map(item =>{
//     if(maRole.indexOf(item)!== -1){
//       console.log('done')
//       status = true;
//     }
//   })
//   if(status) next()
//   else return res.status(405).json({msg: 'Method not Allow'})
 
// };
// const checkAccountAdmin = async (req, res, next) =>{
//   const { maRole } = req;
//   let token = req.headers["x-access-token"] || req.headers["authorization"];
//   if (token && token.startsWith("JWT ")) {
//     token = token.split(" ")[1];
//   }
//   let currentRole = req.body.role;
//   req.isAdmin = false;
//   req.check = false;
//   req.role = [];
//   if (token) {
//     req.check = true;
//     jwt.verify(token, config.SECRECT_WORD, async (err, decoded) => {
//       if (err) {
//         return Unauthorized(res, "Invalid Token!");
//       }
//       req.decoded = decoded
//       const { role } = decoded;
//       role.map(irole =>{
//        if( maRole.indexOf(irole)!==-1) {
//         req.isAdmin = true;
//         req.role =currentRole;

//        }
//       })
//     })
//   }
//   next();
// }
//  const checkUser=async (req, res, next) =>{
//      const {isAdmin}= await getAccountById(req.params.id);
//         if(isAdmin)
//            return res.status(405).json({msg: 'The account not a User'})
//         next();
//     }
// const checkAdmin=async (req, res, next) =>{
//    const {isAdmin}= await getAccountById(req.params.id);
//        if(!isAdmin)
//          return res.status(405).json({msg: 'The account not a Admin'})
//         next();
//      }      

module.exports = { requiredLogin};
