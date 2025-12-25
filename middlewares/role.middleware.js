// const authorizeRoles=(...allowedRoles)=>{
//     return (req,res,next)=>{
//         if(!allowedRoles.includes(req,user.role)){
//             return res.status (403).json({message:"Access denied"})
//         }
//         next()
//     }
// }


// module.exports = authorizeRoles

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // User must be attached by auth middleware
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized: Login required" });
      }

      // Check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: Forbidden" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorizeRoles;
