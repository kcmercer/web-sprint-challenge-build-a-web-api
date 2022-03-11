// add middlewares here related to actions
const Action = require('./actions-model');

const verifyId = (req, res, next) => {
  Action.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(404).json({ message: `Unable to locate action ${req.params.id}`})
      } else {
          req.action = action
          next()
      }
    })
    .catch(err => console.log(err))
}

const verifyPayload = (req, res, next) => {
  const { project_id, description, notes } = req.body

  if (!project_id || !notes || !notes.trim()|| !description || !description.trim()) {
    res.status(400).json({ message: 'Please provide a project id, notes and description' })
  } else {
    next()
  }
}

module.exports = { verifyId, verifyPayload }