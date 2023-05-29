/**
 * Ruta para la empresa actual y su registro.
 * Path: api/empresa/
 */
 const { Router } = require("express");
 const { empresasController, vacantesController } = require("../controllers");
 // TODO cambiar los isUser a isAdmin y authorization a isLogged
 const { authorization, isUser } = require("../middlewares");
 
 const router = Router();
 // const { check } = require("express-validator");
 
 /* Obtiene los datos de la empresa logeada */
 router.get("/",
	 authorization,
	 empresasController.datosEmpresa)
 
  /* PUT, edita los datos de la empresa logeada -------- */
  router.put("/",
	  authorization,
	  empresasController.putEmpresa);

	/* PATCH, cambia la contraseña -------- */
router.patch("/",
	authorization,
	empresasController.changuePassword);
 
 // /* POST Una empresa envía solicitud para aprobación */
 router.post("/registrar",
	 empresasController.registerEmpresa);
 
 
 /* Administrar las vacantes de la empresa acutal */
 
 /* GET obtiene las vacantes de la empresa logeada*/
 router.get("/vacantes",
	 authorization,
	 vacantesController.vacantesEmpresa);
 
 /* POST crear una vacante por parte de la empresa logeada */
 router.post("/vacantes",
	 authorization,
	 vacantesController.createVacante);
 
 /* PUT edita una vacante de la empresa logeada*/
 router.put("/vacantes",
	 authorization,
	 vacantesController.editVacante);
 
 /* PATCH edita la disponibilidad de una vacante de la empresa logeada*/
 router.patch("/vacantes",
	 authorization,
	 vacantesController.changeAvailableVacante);
 
 
 
 module.exports = router;