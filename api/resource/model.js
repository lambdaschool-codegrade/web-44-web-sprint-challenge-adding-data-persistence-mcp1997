const db = require('../../data/dbConfig')

async function find() {
  return db('resources')
}

async function findById(id) {
  const [resource] = await db('resources').where('resource_id', id)
  return resource
}

async function create(resource) {
  const [id] = await db('resources').insert(resource)
  const newResource = await findById(id)
  return newResource
}

module.exports = {
  find,
  findById,
  create
}
