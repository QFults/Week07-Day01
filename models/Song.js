const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Song extends Model { }

Song.init({
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  album: DataTypes.STRING
}, { sequelize, modelName: 'songs' })

module.exports = Song
