// add middlewares here related to projects
const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json({ message: 'project not found' });
        } else {
            req.validateProjectId = project;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'could not find project' })
    }
    next();
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if(!name || !description || !name.trim() || !description.trim()) {
        res.status(400).json({ message: 'must include a name or description' });
    } else {
        req.name = name.trim();
        req.description = description.trim();
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProject
}