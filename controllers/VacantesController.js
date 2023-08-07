const { Empresas, Vacantes } = require("../models/");
const { pdfService } = require("../services/");

// GET /vacantes?id=number obtiene todas las vacantes, si se le da una id obtiene una sola vacante
// si una empresa logeada hace la solicitud obtiene solo lo de ella
// si un vinculador logeado hace la solicitud puede obtener todo
exports.getAll = async (req,res,next) => {
    try {
        const { id } = req.query;
        const { userType } = req;
    
        switch (userType) {
            
          case 'admin':
            if (typeof id === 'undefined') {
                // Obtiene todas las vacantes
                const vacantes = await Vacantes.findAll({
                    include: [{ model: Empresas, attributes: ['name'] }],
                    order: [
                        ['disponibility','ASC'],
                        [Empresas, 'name', 'ASC'],
                    ]
                });
                return res.status(200).json({vacantes });

            } else if (typeof id === 'number') {
                // Obtiene una vacante
                const vacante = await Vacantes.findOne(
                    { where: { id }, include: [{ model: Empresas, attributes: ['name'] }] }
                );
                
                return res.status(200).json({ vacante });
            }
            break;
    
          case 'company':
            const companyId = req.user;
            if (companyId === id) {
                // Obtiene una vacante de la empresa logeada
                const vacante = await Vacantes.findOne(
                    { where: { id }, include: [{ model: Empresas, attributes: ['name'] }] }
                );
                
                return res.status(200).json({ vacante });
            } else {
              return res.status(403).json({
                message: 'No cuentas con los permisos necesarios.',
              });
            }
        }

    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// GET /vacantes?status('inRevision','accepted','rejected','deleted') 
// Si es admin el token, devuelve todas las vacantes
// Si es empresa el token, devuelve todas las vacantes de esa empresa
exports.getAll = async (req,res,next) => {
    try {
        const {status} = req.query
        const { userType } = req;
    
        switch (userType) {
          case 'admin':
                // obtiene todas las vacantes
                const vacantes = await Vacantes.findAll({
                where:{status},
                include: [{ model: Empresas, attributes: ['name'] }],
                order: [
                        ['disponibility','ASC'],
                        [Empresas, 'name', 'ASC'],
                    ]
                });
                return res.status(200).json({ vacantes });
            case 'company':
                const companyId = req.user;
                const vacants = await Vacantes.findAll({
                    where:{status,id:companyId},
                    include: [{ model: Empresas, attributes: ['name'] }],
                    order: [
                        ['disponibility','ASC'],
                        [Empresas, 'name', 'ASC'],
                    ]
                });
                return res.status(200).json({ vacants });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}
  
  
// GET /vacantes/:id obtiene una vacante
exports.getOne = async (req,res,next) => {
    try {
        const { id } = req.params;
        const vacante = await Vacantes.findOne(
            { where: { id }, include: [{ model: Empresas, attributes: ['name'] }] }
        );
        return res.status(200).json({ vacante });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error del servidor' });
      }
}

// GET /vacantes/pdf/:id genera y manda el pdf del id de la vacante dada
exports.getPdf = async (req,res,next) => {
    try {
        const { id } = req.params;
        const vacante = await Vacantes.findOne(
            { where: { id: id }, include: [{ model: Empresas, attributes: ['name','city','address','recruiter_email'] }] }
        );
        let parsedVacante = vacante.dataValues
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=${parsedVacante.name}.pdf`
        });
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            parsedVacante
        )
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// POST /vacantes crea una vacante
exports.post = async (req,res,next) => {
    try {
        let data = req.body;
        const  empresaId  = req.user;
        data.empresa_id = empresaId;
        await Vacantes.create(data);

        return res.status(200).json({
            message: "Solicitud de vacante enviada",
        });
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// PUT /vacantes Edita completamente una vacante, cuando se edita una vacante, sus status vuelve a 'inRevision'
exports.put = async (req,res,next) => {
    try {
        const empresaId = req.user;
        const data = req.body;
        const vacante = await Vacantes.findOne({ where: { id: data.id, empresa_id:empresaId } });

        if (!vacante) {
            return res.status(404).json({
                ok: false,
                message: "No existe la vacante"
            });
        }

        vacante.set(data);

        vacante.status = 'inRevision'

        await vacante.save();

        return res.status(200).json({
            message: "Vacante actualizada correctamente.",
        });
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// PUT /vacantes Edita el status de una vacante (solo a rejected,accepted,inRevision) o su disponibilidad (available,taken)
exports.patch = async (req,res,next) => {
    try {
        const { status, id } = req.body;
        let rowToPatch = 'status'
        const acceptedStatus = ['rejected','accepted','inRevision']

        // si el status que se manda no es del tipo acceptedStatus entonces es del tipo disponibility
        if (!acceptedStatus.some(status => status === status)) {
            rowToPatch = 'disponibility'
        }
        const vacante = await Vacantes.findOne({ where: { vacanteId: id } });

        switch(rowToPatch){
            case 'status':
                vacante.status = status;
                break
            case 'disponibility':
                vacante.disponibility = status
                break
        }

        await vacante.save();

        return res.status(200).json({
            message: "Estatus de la vacante actualizado correctamente.",
        });
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}

// PUT /vacantes Setea el status de una vacante a deleted
exports.delete = async (req,res,next) => {
    try {
        const { id } = req.body;
        const vacante = await Vacantes.findOne({ where: { id } });
  
        vacante.status = 'deleted';
        await vacante.save()
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ message: "Error del servidor" });
    }
}