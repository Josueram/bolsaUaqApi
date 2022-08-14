//Models
const { Empresas, Vacantes } = require("../models/");
const { pdfService } = require("../services/");

/* Regresa todas las vacantes */
exports.getVacantes = async (req, res, next) => {
    try {
        const vacantes = await Vacantes.findAll({
            // include: [{ model: Empresas, attributes: ['nombreEmpresa'],order:[
            //     ['nombreEmpresa','ASC']
            // ]}],
            // // order:[
            // //     ['empresas','ASC']
            // // ]
            include: [{ model: Empresas, attributes: ['nombreEmpresa'] }],
            order: [
                [{ model: Empresas, }, 'nombreEmpresa', 'ASC']
            ]
        });
        return res.status(200).json({ message: vacantes });
    } catch (error) {
        console.log(error)
        return res
            .status(400)
            .json({ message: "Error al obtener las vacantes" });
    }
}

/* Regresa todas las vacantes */
exports.getVacanteById = async (req, res, next) => {

    const { id } = req.params;

    try {
        const vacante = await Vacantes.findOne(
            // {include: [{ model: Empresas, as: 'empresa', attributes: ['nombreEmpresa'] }]}
            { where: { vacanteId: id }, include: [{ model: Empresas, attributes: ['nombreEmpresa'] }] }
        );

        if (!vacante) {
            return res.status(404).json({
                ok: false,
                message: "No se encuentra la vacante o se ha eliminado."
            });
        }

        // TODO que tambien regrese el nombre de la empresa
        return res.status(200).json({
            ok: true,
            data: vacante
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error al encontrar la vacantes."
        });
    }
}

/* Regresa las vacantes de la empresa logeada */
exports.vacantesEmpresa = async (req, res, next) => {
    try {
        const empresaId = req.user;
        const vacantes = await Vacantes.findAll({ where: { empresaId } });
        // TODO que tambien regrese el nombre de la empresa
        return res.status(200).json({ message: vacantes });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "Error al obtener las vacantes"
        });
    }
}

/* Regresa el archivo PDF */
exports.getVacantePdf = async (req, res, next) => {
    const { id } = req.params;
    try {
        const vacante = await Vacantes.findOne(
            // {include: [{ model: Empresas, as: 'empresa', attributes: ['nombreEmpresa'] }]}
            { where: { vacanteId: id }, include: [{ model: Empresas, attributes: ['nombreEmpresa','ciudad','direccion','emailReclutador',] }] }
        );

        if (!vacante) {
            return res.status(404).json({
                ok: false,
                message: "No se encuentra la vacante o se ha eliminado."
            });
        }
        // TODO cambiarle el nombre vacantes.pdf
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename=${vacante.nombreVacante}.pdf`
            
        });
       console.log(vacante)
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            vacante
        )
        // return res.json({ ok: true, vacante });
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ message: "Error al generar PDF" });
    }
}

/* Crea una vacante */
exports.createVacante = async (req, res, next) => {
    let data = req.body.form;
    const  empresaId  = req.user;
    // console.log(data)
    // data.status = 0;
    data.empresaId = empresaId;
    data.rangoSueldo = '$' + data.rangoSueldo
    try {
        const vacante = await Vacantes.create(data);

        return res.status(200).json({
            ok: true,
            message: "Solicitud de vacante enviada",
            data: vacante
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: error
        });
    }

}

/* Edita la vacante */
exports.editVacante = async (req, res, next) => {
    const  empresaId  = req.user;
    // const { id } = req.params;
    const data = req.body;
    // delete (data.status); // Elimina el status para que no se edique
    console.log(req.user)
    // data.status = 2
    try {
        const vacante = await Vacantes.findOne({ where: { vacanteId: data.id, empresaId } });

        if (!vacante) {
            return res.status(404).json({
                ok: false,
                message: "No se encuentra la vacante o se ha eliminado."
            });
        }

        vacante.set(data);
        console.log(data)
        await vacante.save();

        return res.status(200).json({
            ok: true,
            message: "Vacante actualizada correctamente.",
            data: vacante
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: error
        });
    }

}

/* Cambia el status de una vacante, cualquier int diferente de 0,1,2 regresa error */
exports.changeStatusVacante = async (req, res, next) => {
    const { status, id } = req.body.data;
    // console.log(req.body)
    // const  empresaId  = req.user;
    // const statusId = parseInt(status);
    // const validStatus = [0, 1, 2];

    // if (!validStatus.some(x => x === statusId)) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: "Estatus no válido."
    //     });
    // }

    try {
        const vacante = await Vacantes.findOne({ where: { vacanteId: id } });
        if (!vacante) {
            return res.status(404).json({
                ok: false,
                message: "No se encuentra la vacante o se ha eliminado."
            });
        }

        vacante.status = status;
        await vacante.save()

        return res.status(200).json({
            ok: false,
            message: "Estatus de la vacante actualizado correctamente.",
            data: vacante
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: error
        });
    }
}

/* Cambia la disponibilidad de una vacante, cualquier int diferente de 0,1 regresa error (solo la misma empresa puede realizar esta accion)*/
exports.changeAvailableVacante = async (req, res, next) => {
    const { isDisponible, vacanteId } = req.body.data;
    // const statusId = parseInt(status);
    // const validStatus = [0, 1];

    // if (!validStatus.some(x => x === statusId)) {
    //     return res.status(400).json({
    //         ok: false,
    //         message: "Estatus no válido."
    //     });
    // }

    try {
        const vacante = await Vacantes.findOne({ where: { vacanteId } })

        // if (!vacante) {
        //     return res.status(404).json({
        //         ok: false,
        //         message: "La vacante no se encuentra o ha sido eliminada."
        //     });
        // }

        vacante.isDisponible = isDisponible
        await vacante.save();

        return res.status(200).json({
            ok: true,
            message: "Estatus de la vacante actualizado correctamente.",
            data: vacante
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: "No se pudo editar el estatus de la vacante."
        });
    }
}
