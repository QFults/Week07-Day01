const express = require('express')
const { join } = require('path')
const sequelize = require('./db')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))

sequelize.sync()
// sequelize.sync({ force: true })
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
