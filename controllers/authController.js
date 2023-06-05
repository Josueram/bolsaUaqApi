const jwt = require("jsonwebtoken");
const { Empresas } = require("../models/");
const { generateJwt } = require("../helpers");
const bcrypt = require('bcryptjs');

const loginEmpresa = async (req, res, next) => {
	const { usuario, password } = req.body.data;
	const empresa = await Empresas.findOne({ where: { usuario: usuario, status:0 } });
	
	if (!empresa) {
		return res.status(500).json({
			ok: false,
			message: "Usuario o contraseña incorrectos"
		});
	}

	const hashPassword = await bcrypt.compare(password, empresa.dataValues.password)

	if (!hashPassword) {
		return res.status(500).json({
			ok: false,
			message: "Usuario o contraseña incorrectos"
		});
	}

	// const token = await generateJwt({
	// 	type: "USER",
	// 	empresaId: empresa.empresaId
	// });
	const token = jwt.sign(
		{
		  "user":empresa.empresaId,
		},
		'debugkey'
	  );

	return res.status(200).json({
		ok: true,
		message: token,
	});
}

const loginVinculador = async (req, res, next) => {

	const { usuario, password } = req.body.data;
	if (usuario === "10949" && password === "10949.") {

		const token = jwt.sign(
			{
			  "user":"ADMIN",
			},
			'debugkey'
		  );

		return res.status(200).json({
			ok: true,
			message: token,
		});

	} else {
		return res.status(401).json({ ok: false, message: "Datos incorrectos" });
	}
}

module.exports = {
	loginEmpresa,
	loginVinculador
};