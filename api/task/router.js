const express = require('express')
const helpers = require('./model')

const { validateTask, validateProjectExists } = require('./middleware')

const router = express.Router()

router.post('/', validateTask, validateProjectExists, (req, res, next) => {
  helpers.create(req.body)
    .then(task => {
      res.status(201).json(task)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  helpers.find()
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(next)
})

module.exports = router
