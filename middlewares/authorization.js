const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({
            message: 'No cuentas con los permisios necesarios.'
        });
    }

    const token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        req.userType = decoded.userType;
        next();

    } catch (error) {
        res.status(403).json({
            message: 'No cuentas con los permisios necesarios.'
        });
    }
    
}