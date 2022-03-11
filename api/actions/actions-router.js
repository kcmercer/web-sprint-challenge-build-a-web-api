// Write your "actions" router here!
const router = require('express').Router();
const Action = require('./actions-model');
const { verifyId, verifyAction } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Action.get()
      .then(actions => {
          res.status(200).json(actions);
      })
      .catch(next)
});

router.get('/:id', verifyId, (req, res) => {
  res.json(req.action)

});

router.post('/',verifyId, verifyAction, (req, res, next) => {
    Action.insert(req.body)
      .then(newAction => {
          res.status(201).json(newAction)
      })
      .catch(next)

});

router.put('/:id', verifyId, verifyAction, (req, res, next) => {
  if (req.body.completed || req.body.completed === false) {
    Action.update(req.params.id, req.body)
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

router.delete('/:id', verifyId, async (req, res, next) => {
  try {
      await Action.remove(req.params.id)
      res.json(req.action)
  } catch (err) {
      next(err)
  }
});
module.exports = router;