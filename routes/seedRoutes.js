const router = require('express').Router()
const { Song } = require('../models')

router.post('/songs', (req, res) => {
  Song.destroy({ where: {} })
    .then(() => {
      Song.bulkCreate([
        {
          title: 'If I Go, Im Goin',
          artist: 'Gregory Isakov',
          album: 'This Empty Northern Hemisphere'
        },
        {
          title: 'Nothings Gonna Happen',
          artist: 'The Strave',
          album: 'Nothings Gonna Happen'
        },
        {
          title: 'The Only Boy Awake',
          artist: 'Meadows',
          album: 'The Only Boy Awake'
        },
        {
          title: 'Front Porch',
          artist: 'Joy Williams',
          album: 'Front Porch'
        },
        {
          title: 'Turtable',
          artist: 'Dead Horses',
          album: 'My Mother The Moon'
        }
      ])
        .then(() => {
          res.sendStatus(200)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
