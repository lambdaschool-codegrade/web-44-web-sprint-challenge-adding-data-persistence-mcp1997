const db = require('../../data/dbConfig')

async function find() {
  const projects = await db('projects')
  const results = projects.map(project => {
    const result = {
      ...project,
      project_completed: project.project_completed === 0 ? false : true
    }
    return result
  })
  return results
}

async function findById(id) {
  const [project] = await db('projects').where('project_id', id)
  const result = {
    ...project,
    project_completed: project.project_completed === 0 ? false : true
  }
  return result
}

async function create(project) {
  const [id] = await db('projects').insert(project)
  const newProject = await findById(id)
  return newProject
}

module.exports = {
  find,
  findById,
  create,
}
