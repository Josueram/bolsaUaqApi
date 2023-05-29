//Models
const { Empresas } = require("../models/");

const { imagesService } = require("../services/");

const bcrypt = require('bcryptjs');



/* Regresa los datos de la empresa actual */
exports.datosEmpresa = async (req, res, next) => {
    try {
        const  empresaId  = req.user;
        const empresa = await Empresas.findOne({ where: { empresaId: empresaId } });
        if (!empresa) {
            return res.status(404).json({
                ok: false,
                message: "La empresa no está disponible o fue eliminada.",
            });
        }

        return res.status(200).json({
            ok: true,
            message: empresa,
            data: empresa
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error al cargar los datos de la empresa.",
        });
    }
}

/* Regresa todas las empresas */
exports.getEmpresas = async (req,res,next) => {
    try {
        const empresas = await Empresas.findAll({
            order:[
                ['nombreEmpresa','ASC']
            ]
        });
        // const empresas = await Empresas.findAll();
        return res.status(200).json({ message: empresas }); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error al obtener las empresas" }); 
    }
}

/* Regresa la informacion de una empresa */
exports.getEmpresaInfo = async (req,res,next) => {
    try {
        const {empresaId} = req.user
        const empresas = await Empresas.findOne({where:{empresaId}});
        // const empresas = await Empresas.findAll();
        return res.status(200).json({ message: empresas }); 
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error al obtener la empresa" }); 
    }
}

/* Registrar una empresa para aprobación */
exports.registerEmpresa = async (req, res, next) => {
    const data = req.body;
    try {
        // La imagen se sube
        const response = await imagesService.uploadImage(req.files?.logo);
        // Algo esta mal con la imagen
        if (!response.ok) {
            return res.status(400).json({
                ok: false,
                message: response.message,
            });
        }
        
        data.logo = response.data
        console.log(data)
        // Todo esta bien con la imagen y se le asigna ese path a la BD
        // console.log(response.data);
        // Se guarda la empresa en la BD    
        console.log("final--------")
        const empresa = await Empresas.create(data)

        return res.status(200).json({
            ok: true,
            message: "Solicitud enviada correctamente y en espera de aprobación."
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: error
        });
    }
}

/* Cambia el status de una empresa,asigna contraseña y usuario en caso de que el status sea 0 (aceptada)( cualquier int diferente de 0,1,2 regresa error9 */
exports.changeStatus = async (req, res, next) => {
    const { status, id,password,usuario } = req.body.data;

    const statusId = parseInt(status);

    const validStatus = [0, 1, 2];
    if (!validStatus.some(x => x === statusId)) {
        return res.status(400).json({
            ok: false,
            message: "Estatus no válido."
        });
    }

    try {
        const empresa = await Empresas.findOne({ where: { empresaId: id } });

        if (!empresa) {
            return res.status(404).json({
                ok: false,
                message: "No se encuentra la empresa o ha sido eliminada.",
                data: empresa
            });
        }

        if(status==0){
            empresa.usuario = usuario;
            const hash = await bcrypt.hash(password, 10)
            empresa.password = hash;
        }

        empresa.status = statusId;
        await empresa.save()

        return res.status(200).json({
            ok: true,
            message: "Estatus de la empresa actualizada correctamente.",
            data: empresa
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: error
        });
    }

}

/*Edita la información de una empresa */
exports.putEmpresa = async (req,res,next) => {
    try{
        const data = req.body.form
        const empresaId = req.user
        const empresa = await Empresas.findOne({where:{empresaId:empresaId}})
        empresa.set(data)
        await empresa.save()

       return res.status(200).json({ message: `${empresa.nombreEmpresa} editada correctamente` });
        
    } catch(e){
        console.log(e)
        return res.status(400).json({ message: "Algo salio mal" });
    }
}

exports.changuePassword = async (req,res,next) => {
    try{
        const { actualPassword,nuevoPassword} = req.body.data;
        const empresaId = req.user

        const empresa = await Empresas.findOne({where:{empresaId:empresaId}})
        const hashPassword = await bcrypt.compare(actualPassword, empresa.dataValues.password)

        if (!hashPassword) {
            return res.status(500).json({
                ok: false,
                message: "Contraseña incorrecta"
            });
        }
        const hash = await bcrypt.hash(nuevoPassword, 10)
        empresa.password = hash;
        await empresa.save()

        return res.status(200).json({ message: `Contraseña cambiada exitosamente` });

        
    } catch(e){
        console.log(e)
        return res.status(400).json({ message: `Algo salio mal` });
    }
}