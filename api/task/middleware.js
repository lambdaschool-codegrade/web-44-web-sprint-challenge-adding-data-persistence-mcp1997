const db = require('../../data/dbConfig')

const validateTask = (req, res, next) => {
  const { task_description, project_id } = req.body

  if (
    !task_description
    || task_description === ''
    || typeof task_description !== 'string'
  ) {
    res.status(400).json({
      message: 'invalid task_description'
    })
  } else if (!project_id || typeof project_id !== 'number') {
    res.status(400).json({
      message: 'invalid project_id'
    })
  } else {
    next()
  }
}

const validateProjectExists = async (req, res, next) => {
  const { project_id } = req.body

  const [existingProject] = await db('projects').where('project_id', project_id)

  if (!existingProject) {
    res.status(404).json({
      message: `project with project_id ${project_id} not found`
    })
  } else {
    next()
  }
}

module.exports = {
  validateTask,
  validateProjectExists,
}