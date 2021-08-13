
const validateProject = (req, res, next) => {
  const { project_name } = req.body

  if (!project_name || project_name === '' || typeof project_name !== 'string') {
    res.status(400).json({
      message: 'invalid project_name'
    })
  } else {
    next()
  }
}

module.exports = {
  validateProject,
}