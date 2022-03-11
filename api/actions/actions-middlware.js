// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id);
        if (!action) {
            res.status(404).json({ message: 'Action does not exist' });
        } else {
            req.action = action;
            next();
        }
    } catch (err) {
        res.status(404).json({ message: 'Action does not exist' })

    }
}
function validateAction(req, res, next) {
    const {project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: 'Please provide a name and description' });
    } else {
        req.description = description.trim();
        req.notes = notes.trim();
        next();
    }
}

module.exports = { validateActionId, validateAction };