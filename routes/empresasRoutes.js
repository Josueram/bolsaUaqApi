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

/* Loggea a una empresa */
router.get("/changue-password",
	EmpresasController.changuePassword);

/* Obtiene todas las empresas */
router.get("/",
	authorization,
	isAdmin,
	EmpresasController.getAll);

/* Obtiene información sobre las empresas */
router.get("/:id",
	authorization,
	EmpresasController.getOne);

/* Crea una empresa */
router.post("/",
	EmpresasController.post);

/* Edita completamente una empresa */
router.put("/:id",
	authorization,
	isUser,
	EmpresasController.put);

/* Edita un solo campo de una empresa */
router.patch("/:id",
	authorization,
	EmpresasController.patch);

/* Cambia el status de una empresa a 'deleted' */
router.delete("/:id",
	authorization,
	isAdmin,
	EmpresasController.delete);
 
 module.exports = router;