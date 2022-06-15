//Models
const { Empresas } = require("../models/");

/* Regresa los datos de la empresa actual */
exports.datosEmpresa = async (req, res, next) => {
    try {
        const { empresaId } = req.currentUser;
        console.log(req.currentUser)
        const empresa = await Empresas.findOne({ where: { empresaId: empresaId } });

        if (!empresa) {
            return res.status(404).json({
                ok: false,
                message: "La empresa no está disponible o fue eliminada.",
            });
        }

        return res.status(200).json({
            ok: true,
            message: "",
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
exports.getEmpresas = async (req, res, next) => {
    try {
        const empresas = await Empresas.findAll();

        return res.status(200).json({
            ok: true,
            message: "",
            data: empresas
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error al obtener las empresas.",
        });
    }
}

/* REgistrar una empresa para aprobación */
exports.registerEmpresa = async (req, res, next) => {
    const data = req.body;
    try {
        const empresa = await Empresas.create(data)

        return res.status(200).json({
            ok: true,
            message: "Solicitud enviada correctamente y en espera de aprobación."
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error
        });
    }
}

/* Cambia el status de una empresa, cualquier int diferente de 0,1,2 regresa error */
exports.changeStatus = async (req, res, next) => {
    const { status, id } = req.params;

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