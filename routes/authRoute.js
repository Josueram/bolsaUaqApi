/**
 * Ruta para dar acceso de usuarios de empresas y usuarios administrativos.
 * Path: api/auth/
 */
const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers/");

// Inicio de sesión para las empresas
router.post("/empresa", authController.loginEmpresa);

// Inicio de sesión para los de vinculación
router.post("/vinculador", authController.loginVinculador);

module.exports = router;
