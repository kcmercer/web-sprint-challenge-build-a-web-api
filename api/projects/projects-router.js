const router = require('express').Router();
const Projects = require('./projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            console.log(projects);

            res.status(200).json(projects);
        })
        .catch(next);
});

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next);
});

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    if (req.body.completed || req.body.completed === false) {
        Projects.update(req.params.id, req.body)
            .then(project => {
                res.json(project);
            })
            .catch(next);
    } else {
        res.status(400).json({
            message: 'Please fill the required fields'
        });
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);

        res.json(req.project);
    } catch (error) {
        next(error);
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
      const result = await Projects.getProjectActions(req.params.id);

      res.json(result);
     }catch (error){
        next(error);
     }
  })

router.use((error, req, res,) => {
    res.status(error.status || 500).json({
        customMessage: 'Post Router is broken',
        message: error.message,
        stack: error.stack
    });
});

module.exports = router;