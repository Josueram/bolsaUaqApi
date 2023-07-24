/**
 * Path: /vinculador
 */
const { Router } = require("express");
const router = Router();
const { VinculadorController } = require("../controllers");

// Loggea un vinculador
router.post("/login", VinculadorController.login);

module.exports = router;
