const Sequelize = require('sequelize')
const { db } = require('../config/')
const Vacantes = require('./Vacantes')

const Empresas = db.define('empresas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    password: {type: Sequelize.STRING(100),allowNull: true,},
    description:{type: Sequelize.STRING, allowNull:false},
    city: {type: Sequelize.STRING, allowNull:false},
    rfc: {type: Sequelize.STRING(32), allowNull:false},
    activity: {type: Sequelize.STRING, allowNull:false},
    business_name: {type: Sequelize.STRING(32), allowNull:false},
    email: {type: Sequelize.STRING(32), allowNull:false},
    phone: {type: Sequelize.STRING(32), allowNull:false},
    username:{type: Sequelize.STRING(32), allowNull:true},
    web_page: {type: Sequelize.STRING(32), allowNull:false},
    address: {type: Sequelize.STRING, allowNull:false},
    colony: {type: Sequelize.STRING, allowNull:false},
    postal_code: {type: Sequelize.STRING(32), allowNull:false},
    state: {type: Sequelize.STRING(32), allowNull:false},

    recruiter_name: {type: Sequelize.STRING, allowNull:false},
    recruiter_email: {type: Sequelize.STRING(32), allowNull:false},
    recruiter_phone:{type: Sequelize.STRING(32), allowNull:false},

    created_at: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    status:{type: Sequelize.ENUM('inRevision','accepted','rejected','deleted'),allowNull: false, defaultValue: 'inRevision'},
})

Vacantes.belongsTo(Empresas, {
    foreignKey: {
        name: 'empresa_id',
        allowNull: true
    }
});

module.exports = Empresas;