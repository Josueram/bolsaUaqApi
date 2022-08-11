const Sequelize = require('sequelize');

const db = new Sequelize('Tables', 'b6e3e3f0bb497c', 'd8c95657', {
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql',
    // user: 'b6e3e3f0bb497c',
    // password: 'd8c95657',
    database: 'heroku_6a07c725fd6a825',
    port: 3308,
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})


module.exports = db