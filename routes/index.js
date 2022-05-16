const express = require("express");
const router = express.Router();
const auth  = require('../middleware/auth') 

// Modelos
const EmpresasController = require('../controllers/EmpresasController')
const VacantesController = require('../controllers/VacantesController')

module.exports = function () {
    /*----------Auth-----------*/
    /* login alumno */
    router.post("/loginEmpresa", EmpresasController.login);
    /* login trabajador */
    router.post("/loginVinculador", (req,res,next)=>{

    });
  
    /*----------Empresa-----------*/
    /* GET obtener todas las empresas */
    router.get("/empresa",
        // auth, 
        EmpresasController.getEmpresa);

    /* POST crear una empresa */
    router.post("/empresa",
        // auth, 
        EmpresasController.postEmpresa);

    /* Patch edita el status de una empresa */
    router.patch("/empresa",
        // auth, 
        EmpresasController.patchEmpresa);

    /*----------Vacante-----------*/
    /* GET obtener todas las vacantes */
    router.get("/vacante",
        // auth, 
        VacantesController.getVacante);

    /* GET obtiene el archivo PDF de esa vacante */
    router.get("/vacante/:id",
        // auth, 
        VacantesController.getVacantePdf);

    /* POST crear una vacante */
    router.post("/vacante",
        // auth, 
        VacantesController.postVacante);

    /* Patch edita el status de una vacante */
    router.patch("/vacante",
        // auth, 
        VacantesController.patchVacante);

    return router
}