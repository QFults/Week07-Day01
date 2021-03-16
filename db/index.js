const { Sequelize } = require('sequelize')

module.exports = new Sequelize('mysql://root:rootroot@localhost/users_db')
