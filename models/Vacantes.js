const Sequelize = require('sequelize')
const { db } = require('../config/');

const Vacantes = db.define('vacantes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: Sequelize.STRING,
    career: {type: Sequelize.STRING, allowNull:false},

    description:{type: Sequelize.STRING, allowNull:false},
    information: {type: Sequelize.STRING, allowNull:false},
    skills: {type: Sequelize.STRING, allowNull:false},
    requirements: {type: Sequelize.STRING, allowNull:false},
    extra_requirements:{type: Sequelize.STRING, allowNull:false},
    
    job_type: {type: Sequelize.STRING, allowNull:false},
    schedule: {type: Sequelize.STRING(32), allowNull:false},
    city: {type: Sequelize.STRING, allowNull:false},
    place: {type: Sequelize.STRING, allowNull:false},
    english_level: {type: Sequelize.STRING(32), allowNull:false},
    salary: {type: Sequelize.STRING(32), allowNull:false},
    state: {type: Sequelize.STRING, allowNull:false},
    area: {type: Sequelize.STRING(32), allowNull:false},
    number_of_vacants: {type: Sequelize.STRING(32), allowNull:false},
    benefits: {type: Sequelize.STRING, allowNull:false},
    contact: {type: Sequelize.STRING(32), allowNull:false},

    created_at: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    expire_date: {type: Sequelize.DATEONLY,allowNull: true},

    status:{type: Sequelize.ENUM('inRevision','accepted','rejected'),allowNull: false, defaultValue: 'inRevision'},
    disponibility:{type: Sequelize.ENUM('available','taken'),allowNull: false, defaultValue: 'available'},
});

module.exports = Vacantes;