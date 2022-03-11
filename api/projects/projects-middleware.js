// add middlewares here related to projects
const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if(!project) {
            res.status(404).json({ message: 'Project does not exist' });
        } else {
            req.project = project;
            next();
        }
    }
    catch (err) {
        res.status(404).json({ message: 'Unable to locate project' })
    }
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if(!name || !description || !name.trim() || !description.trim()) {
        res.status(400).json({ message: 'Please provide a name and description' });
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