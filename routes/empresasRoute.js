/**
 * Ruta para la administración de empresas desde la parte administrativa.
 * Path: api/empresa/
 */
const { Router } = require("express");
const { empresasController } = require("../controllers");
const { authorization, isAdmin } = require("../middlewares");

const router = Router();
// const { check } = require("express-validator");

// /* GET obtener todas las empresas */
router.get("/",
	authorization,
	isAdmin,
	empresasController.getEmpresas);

// /* Patch edita el status de una empresa */
router.patch("/:id/estatus/:status",
	authorization,
	isAdmin,
	empresasController.changeStatus);

module.exports = router;