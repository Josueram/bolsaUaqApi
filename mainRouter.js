/**
 * Router principal con las demás rutas secundarias
 * PATH: /api/
 */

const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

// Routes
const {
	authRoute,
	empresaRoute,
	empresasRoute,
	uploadsRoute,
	vacantesRoute
} = require("./routes");

const router = Router();
router.use(expressFileUpload());

router.use("/auth", authRoute);
router.use("/empresa", empresaRoute);
router.use("/empresas", empresasRoute);
router.use("/uploads", uploadsRoute);
router.use("/vacantes", vacantesRoute);

module.exports = router;