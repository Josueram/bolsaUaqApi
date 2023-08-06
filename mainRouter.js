/**
 * Router principal con las demás rutas secundarias
 * PATH: /
 */

const { Router } = require("express");

// Routes
const {
	empresasRoutes,
	vinculadorRoutes,
	vacantesRoutes
} = require("./routes");

const router = Router();

router.use("/vacantes", vacantesRoutes);
router.use("/empresas", empresasRoutes);
router.use("/vinculador", vinculadorRoutes);

module.exports = router;