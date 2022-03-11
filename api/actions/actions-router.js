// Write your "actions" router here!

const router = require('express').Router()
const Action = require('./actions-model')
const { verifyId, verifyPayload } = require('./actions-middlware')

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.json(actions)
    })
    .catch(next)
})

router.get('/:id', verifyId, (req, res) => {
  res.json(req.action);
})

router.post('/:id', verifyId, (req, res, next) => {
  Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', verifyId, verifyPayload, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(updatedAction => {
      res.json(updatedAction)
    })
    .catch(next)
})

router.delete('/:id', verifyId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(deletedAction => {
      res.json(deletedAction)
    })
    .catch(next)
})

router.use((error, res) => {
  res.status(500).json({
    message: error.message
  })
})

module.exports = router