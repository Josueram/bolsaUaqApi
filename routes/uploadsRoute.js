/**
 * Ruta para la carga y recuperación de imágenes locales.
 * Path: api/uploads/
 */

const { Router } = require("express");
// const { authorization } = require('../middlewares/')
const { uploadsController } = require("../controllers/");

const router = Router();

router.get("/:filename", uploadsController.getImage); // Busca una imagen
router.put("/", uploadsController.uploadImage); // Carga una imagen

module.exports = router;
