/**
 * Ruta para la empresa actual y su registro.
 * Path: api/uploads/
 */
const { Router } = require("express");
const { empresasController, vacantesController } = require("../controllers");
const { authorization, isUser } = require("../middlewares");

const router = Router();
// const { check } = require("express-validator");

/* Obtiene los datos de la empresa actual */
router.get("/",
	authorization,
	isUser,
	empresasController.datosEmpresa)

// /* POST Una empresa envía solicitud para aprobación */
router.post("/registrar",
	empresasController.registerEmpresa);


/* Administrar las vacantes de la empresa acutal */

/* GET obtiene las vacantes de la empresa actual*/
router.get("/vacantes",
	authorization,
	isUser,
	vacantesController.vacantesEmpresa);

/* POST crear una vacante por parte de la empresa actual */
router.post("/vacantes",
	authorization,
	isUser,
	vacantesController.createVacante);

/* PUT edita una vacante*/
router.put("/vacantes/:id",
	authorization,
	isUser,
	vacantesController.editVacante);

/* PATCH edita la disponibilidad de una vacante*/
router.patch("/vacantes/:id/disponible/:status",
	authorization,
	isUser,
	vacantesController.changeAvailableVacante);

/* PUT edita una empresa */
router.put("/empresa",
    	authorization,
    	empresasController.putEmpresa);

module.exports = router;