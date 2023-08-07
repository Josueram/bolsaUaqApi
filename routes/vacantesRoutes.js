/**
 * Path: /empresas
 */
const { Router } = require("express");
const { VacantesController } = require("../controllers");
const { authorization, isAdmin, isUser } = require("../middlewares");

const router = Router();

/* Obtiene todas las vacantes */
router.get("/",
	authorization,
	VacantesController.getAll);

/* Obtiene una vacante */
router.get("/:id",
	authorization,
	VacantesController.getOne);

/* Obtiene el pdf de una vacante */
router.get("/pdf/:id",
	authorization,
	isAdmin,
	VacantesController.getPdf);

/* Crea una vacante */
router.post("/",
   authorization,
	isUser,
	VacantesController.post);

/* Edita completamente una vacante */
router.put("/",
   authorization,
   isUser,
   VacantesController.put);

/* Edita un solo campo de una vacante */
router.patch("/",
   authorization,
   VacantesController.patch);

/* Cambia el status de una vacannte a 'deleted' */
router.delete("/",
   authorization,
   isAdmin,
   VacantesController.delete);

module.exports = router;