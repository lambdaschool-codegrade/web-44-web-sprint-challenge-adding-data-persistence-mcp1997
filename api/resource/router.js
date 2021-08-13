const express = require('express')
const helpers = require('./model')

const { 
  validateNameUnique,
  validateResource,
} = require('./middleware')

const router = express.Router()

router.post('/', validateResource, validateNameUnique, (req, res, next) => {
  helpers.create(req.body)
    .then(resource => {
      res.status(201).json(resource)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  helpers.find()
    .then(resources => {
      res.status(200).json(resources)
    })
    .catch(next)
})

module.exports = router
