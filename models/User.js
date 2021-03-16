const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class User extends Model { }

User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  phone: DataTypes.INTEGER
}, { sequelize, modelName: 'users' })

module.exports = User
