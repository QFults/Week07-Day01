const express = require('express')
// const { join } = require('path')
const { Sequelize, DataTypes, Model, Op } = require('sequelize')

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

// User.create({
//   name: 'Jane Doe',
//   email: 'janedoe@gmail.com',
//   username: 'janedoe',
//   phone: 12345
// })
//   .then(user => {
//     console.log(user.name)
//   })
//   .catch(err => console.log(err))

// User.findAll({ where: { name: 'John Doe' } })
//   .then(users => {
//     users.forEach(user => console.log(`${user.name}, ${user.email}, ${user.username}`))
//   })
//   .catch(err => console.log(err))

// User.findOne({
//   where: {
//     // [Op.and]: [{ name: 'Jane Doe' }, { email: 'janedoe@gmail.com' }]
//     [Op.or]: [{ name: 'John Doe' }, { email: 'johndoe@gmail.com' }]
//   }
// })
//   .then(user => {
//     console.log(user)
//   })
//   .catch(err => console.log(err))

// User.update({ username: 'johndoe1', name: 'JOHN DOE' }, { where: { id: 1 } })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => console.log(err))

User.destroy({ where: { id: 1 } })
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))

sequelize.sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
