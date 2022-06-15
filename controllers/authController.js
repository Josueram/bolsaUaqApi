const jwt = require("jsonwebtoken");
const { Empresas } = require("../models/");
const { generateJwt } = require("../helpers");

const loginEmpresa = async (req, res, next) => {
	const { usuario, password } = req.body;

	const empresa = await Empresas.findOne({ where: { usuario: usuario, password: password } });


	if (!empresa) {
		return res.status(500).json({
			ok: false,
			message: "Usuario o contraseña incorrectos"
		});
	}

	if (empresa.status !== 1) {
		return res.status(500).json({
			ok: false,
			message: "La empresa no ha sido aprobada y no puede iniciar sesión."
		});
	}

	const token = await generateJwt({
		type: "USER",
		empresaId: empresa.empresaId
	});

	return res.status(200).json({
		ok: true,
		message: "Has iniciado sesión correcamente.",
		data: { token }
	});
}

const loginVinculador = async (req, res, next) => {

	const { usuario, password } = req.body;

	if (usuario === "ADMIN" && password === "ADMIN") {

		const token = await generateJwt({
			type: "ADMIN",
			userId: 0
		});

		return res.status(200).json({
			ok: true,
			message: "Has iniciado sesión correctamente.",
			data: { token }
		});

	} else {
		return res.status(401).json({ ok: false, message: "Datos incorrectos" });
	}
}

module.exports = {
	loginEmpresa,
	loginVinculador
};