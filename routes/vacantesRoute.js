/**
 * Ruta administrar las vacantes
 * Path: api/vacantes/
 */
const { Router } = require("express");
const { authorization, isAdmin } = require("../middlewares/");
const { vacantesController } = require("../controllers");

const router = Router();


/* GET obtener todas las vacantes */
router.get("/",
	authorization,
	isAdmin,
	vacantesController.getVacantes);

/* GET obtener una vacante por su id
	Sirve para admin y empresas*/
router.get("/:id",
	authorization,
	vacantesController.getVacanteById);

// /* GET obtiene el archivo PDF de esa vacante */
// router.get("/:id/pdf",
// 	authorization,
// 	isAdmin,
// 	vacantesController.getVacantePdf);

/* PATCH edita el status de una vacante */
router.patch("/:id/estatus/:status",
	authorization,
	isAdmin,
	vacantesController.changeStatusVacante);


module.exports = router;