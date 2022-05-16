const jwt = require("jsonwebtoken");

//Models
const Empresas = require("../models/Empresas");


exports.login = async (req,res,next) => {
    // return 
}

/* Regresa todas las empresas */
exports.getEmpresa = async (req,res,next) => {
    console.log("get empresa")
    try {
        const empresas = await Empresas.findAll();

        return res.status(200).json({ message: empresas }); 
    } catch (error) {
        return res.status(401).json({ message: "Error al obtener las empresas" }); 
    }
}

/* Crea una empresa */
exports.postEmpresa = async (req,res,next) => {
    const data = req.body;
    console.log(data)
    try {
       const empresa = await Empresas.create(data)
    
       return res.status(200).json({ message: "Solicitud enviada correctamente" });
    
      } catch (error) {
        return res.status(401).json({ message: error });
      }
}

/* Cambia el status de una empresa, cualquier int diferente de 0,1,2 regresa error */
exports.patchEmpresa = async (req,res,next) => {
    // return 
}