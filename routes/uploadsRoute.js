/**
 * Ruta para la carga y recuperación de imágenes locales.
 * Path: api/uploads/
 */

 const { Router } = require("express");
 // const { authorization } = require('../middlewares/')
 const { getImage } = require("../controllers/uploadsController");
 
 const router = Router();
 
 router.get("/:filename", getImage); // Busca una imagen
 // router.put("/", uploadsController.uploadImage); // Carga una imagen
 
 module.exports = router;
 