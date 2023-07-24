/**
 * Path: /empresas
 */
 const { Router } = require("express");
 const { EmpresasController } = require("../controllers");
 const { authorization, isAdmin, isUser } = require("../middlewares");
 
 const router = Router();
 
/* Loggea a una empresa */
router.get("/login",
	EmpresasController.login);

/* Obtiene información sobre las empresas */
router.get("/",
	authorization,
	EmpresasController.get);
 
/* Crea una empresa */
router.post("/",
	EmpresasController.post);

/* Edita completamente una empresa */
router.put("/",
	authorization,
	isUser,
	EmpresasController.put);

/* Edita un solo campo de una empresa */
router.patch("/",
	authorization,
	EmpresasController.patch);

/* Cambia el status de una empresa a 'deleted' */
router.delete("/",
	authorization,
	isAdmin,
	EmpresasController.delete);
 
 module.exports = router;