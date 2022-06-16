const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición.'
        });
    }

    const token = req.headers.authorization.split(' ')[1] ?? '';

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.currentUser = payload; // Guarda los datos de la sesión

    } catch (error) {
        // Unauthorize
        res.status(401).json({
            ok: false,
            message: 'Token no válido.'
        });
    }
    next();
}