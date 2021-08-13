const db = require('../../data/dbConfig')

const validateNameUnique = async (req, res, next) => {
  const { resource_name } = req.body

  const [existingResource] = await db('resources')
    .where('resource_name', resource_name)

  if (existingResource) {
    res.status(400).json({
      message: 'resource_name already exists'
    })
  } else {
    next()
  }
}

const validateResource = (req, res, next) => {
  const { resource_name } = req.body

  if (!resource_name || resource_name === '' || typeof resource_name !== 'string') {
    res.status(400).json({
      message: 'invalid resource_name'
    })
  } else {
    next()
  }
}

module.exports = {
  validateNameUnique,
  validateResource
}