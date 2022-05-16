const express = require("express");
const router = express.Router();
const auth  = require('../middleware/auth') 
const isAdmin  = require('../middleware/isAdmin') 
const jwt = require("jsonwebtoken");

// Modelos
const EmpresasController = require('../controllers/EmpresasController')
const VacantesController = require('../controllers/VacantesController')

module.exports = function () {
    /*----------Auth-----------*/
    /* login alumno */
    router.post("/loginEmpresa", EmpresasController.login);
    /* login trabajador */
    router.post("/loginVinculador", (req,res,next)=>{
        if(req.body.data.usuario==="ADMIN" && req.body.data.password==="ADMIN"){
            const token = jwt.sign(
                {
                    "token":"ADMIN",
                },
                'debugkey'
                );
                return res.status(200).json({ message: token });
        }else{
            return res.status(401).json({ message: "Datos incorrectos" });
        }
    });
  
    /*----------Empresa-----------*/
    /* GET obtener todas las empresas */
    router.get("/empresa",
        auth,
        isAdmin, 
        EmpresasController.getEmpresa);

    /* POST crear una empresa */
    router.post("/empresa",
        auth,
        isAdmin, 
        EmpresasController.postEmpresa);

    /* Patch edita el status de una empresa */
    router.patch("/empresa",
        auth,
        isAdmin, 
        EmpresasController.patchEmpresa);

    /*----------Vacante-----------*/
    /* GET obtener todas las vacantes */
    router.get("/vacantes",
        auth, 
        isAdmin,
        VacantesController.getVacantes);
    /* GET obtiene las vacantes de la empresa logeada*/
    router.get("/vacante",
        auth, 
        VacantesController.getVacante);

    /* GET obtiene el archivo PDF de esa vacante */
    router.get("/vacantePdf/:id",
        auth, 
        isAdmin,
        VacantesController.getVacantePdf);

    /* POST crear una vacante */
    router.post("/vacante",
        auth, 
        isAdmin,
        VacantesController.postVacante);

    /* Patch edita el status de una vacante */
    router.patch("/vacante",
        auth, 
        isAdmin,
        VacantesController.patchVacante);

    return router
}