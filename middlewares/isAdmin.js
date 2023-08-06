
module.exports = (req, res, next) => {
     console.log(req.userType)
     if (req.userType === "admin") {
          next();
     } else {
          // Forbidden
          // console.log(req.user)
          return res.status(403).json({ message: 'No cuentas con los permisos necesarios' });
     }
}