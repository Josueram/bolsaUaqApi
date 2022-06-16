
module.exports = (req, res, next) => {
     if (req.currentUser.type === "ADMIN") {
          next();
     } else {
          // Forbidden
          return res.status(403).json({ code: 403, message: 'No cuentas con los permisos necesarios' });
     }
}