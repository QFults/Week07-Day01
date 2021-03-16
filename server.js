const express = require('express')
// const { join } = require('path')
const { Sequelize, DataTypes, Model } = require('sequelize')

const app = express()

// app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(require('./routes'))

const sequelize = new Sequelize('mysql://root:rootroot@localhost/users_db')

class User extends Model { }

User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  username: DataTypes.STRING,
  phone: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'users'
})

sequelize.sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
