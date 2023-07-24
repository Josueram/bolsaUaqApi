const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({
            message: 'No cuentas con los permisios necesarios.'
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    // console.log(token)
    try {
        // const payload = jwt.verify(token, process.env.JWT_SECRET);
        // const payload = jwt.verify(token, 'debugkey');
        // req.user = payload; // Guarda los datos de la sesión
        const decoded = jwt.verify(token, 'debugkey');
        req.user = decoded.user;
        req.userType = decoded.userType;
        next();

    } catch (error) {
        res.status(403).json({
            message: 'No cuentas con los permisios necesarios.'
        });
    }
    
}