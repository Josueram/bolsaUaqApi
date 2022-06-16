const jwt = require('jsonwebtoken');

/**
 * Genera un token en base a un payload, se hace de forma asíncrona.
 * @param payload Objeto con los datos que se almacenarán en el token.
 * @returns Devuelve una promesa que resuelve el token.
 */
const generateJwt = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, {
			// expiresIn: '12h'
		}, (err, token) => {
			if (err) {
				console.log(err);
				reject('No se pudo generar el JWT.');
			} else {
				resolve(token);
			}

		});
	});
}


module.exports = generateJwt;