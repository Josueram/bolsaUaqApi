const Sequelize = require('sequelize')
const { db } = require('../config/');

const Vacantes = db.define('vacantes', {
    vacanteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreVacante: Sequelize.STRING,
    descripcion:{type: Sequelize.STRING, allowNull:false},
    requisitos: {type: Sequelize.STRING, allowNull:false},
    competencias: {type: Sequelize.STRING, allowNull:false},
    tipoContratacion: {type: Sequelize.STRING, allowNull:false},
    tipoEmpleo: {type: Sequelize.STRING, allowNull:false},
    informacion: {type: Sequelize.STRING, allowNull:false},
    estado: {type: Sequelize.STRING, allowNull:false},
    ciudad: {type: Sequelize.STRING, allowNull:false},
    nivelIngles: {type: Sequelize.STRING(32), allowNull:false},
    rangoSueldo: {type: Sequelize.STRING(32), allowNull:false},
    carrera: {type: Sequelize.STRING, allowNull:false},
    area: {type: Sequelize.STRING(32), allowNull:false},
    horario: {type: Sequelize.STRING(32), allowNull:false},
    contacto: {type: Sequelize.STRING(32), allowNull:false},
    numeroPersonas: {type: Sequelize.STRING(32), allowNull:false},
    prestaciones: {type: Sequelize.STRING, allowNull:false},
    otrosRequisitos:{type: Sequelize.STRING, allowNull:false},
    fechaRegistro: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    fechaVencimiento: {type: Sequelize.DATEONLY,allowNull: true},
    // 0 aceptada,1 rechazada, 2 pendiente
    status: { type: Sequelize.INTEGER(1), allowNull: true, defaultValue: 2 },
    // 0 disponible, 1 ocupada
    isDisponible: { type: Sequelize.INTEGER(1), allowNull: true, defaultValue: 0 },
});

module.exports = Vacantes;