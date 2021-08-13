const express = require('express')
const helpers = require('./model')

const { validateProject } = require('./middleware')

const router = express.Router()

router.post('/', validateProject, (req, res, next) => {
  helpers.create(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  helpers.find()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(next)
})

module.exports = router
