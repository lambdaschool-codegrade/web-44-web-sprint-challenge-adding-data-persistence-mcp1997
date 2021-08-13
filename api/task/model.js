const db = require('../../data/dbConfig')

async function find() {
  const tasks = await db('tasks')
  const results = tasks.map(task => {
    const result = {
      ...task,
      task_completed: task.task_completed === 0 ? false : true
    }
    return result
  })
  return results
}

async function findById(id) {
  const [task] = await db('tasks').where('task_id', id)
  const result = {
    ...task,
    task_completed: task.task_completed === 0 ? false : true
  }
  return result
}

async function create(task) {
  const [id] = await db('tasks').insert(task)
  const newTask = await findById(id)
  return newTask
}

module.exports = {
  find,
  findById,
  create,
}
