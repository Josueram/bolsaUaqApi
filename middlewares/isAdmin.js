
module.exports = (req, res, next) => {
     if (req.userType === "admin") {
          next();
     } else {
          // Forbidden
          // console.log(req.user)
          return res.status(403).json({ code: 403, message: 'No cuentas con los permisos necesarios' });
     }
}