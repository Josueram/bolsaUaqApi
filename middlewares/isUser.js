
module.exports = (req, res, next) => {
	if (req.currentUser.type === "USER") {
		next();
	} else {
		// Forbidden
		return res.status(403).json({ code: 403, message: 'No cuentas con los permisos necesarios.' });
	}
}