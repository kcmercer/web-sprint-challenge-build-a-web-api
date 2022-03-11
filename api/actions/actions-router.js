// Write your "actions" router here!
const router = require('express').Router();
const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

router.get('/', (req, res, next) => {
  Actions.get()
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(next)
});

router.get('/:id', validateActionId, (req, res) => {
  res.json(req.action)

});

router.post('/',validateActionId, validateAction, (req, res, next) => {
  Actions.insert(req.body)
      .then(newAction => {
          res.status(201).json(newAction)
      })
      .catch(next)

});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  if (req.body.completed || req.body.completed === false) {
      Actions.update(req.params.id, req.body)
          .then(action => {
              res.json(action)
          })
          .catch(next)
  } else {
      res.status(400).json({
          message: 'missing required  fields'
      })
  }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
      await Actions.remove(req.params.id)
      res.json(req.action)
  } catch (err) {
      next(err)
  }
});
module.exports = router;