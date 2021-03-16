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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  username: DataTypes.STRING,
  phone: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
  // increment: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   primaryKey: true
  // }
}, {
  sequelize,
  modelName: 'users'
})

sequelize.sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
