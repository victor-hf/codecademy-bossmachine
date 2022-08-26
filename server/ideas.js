const ideasRouter = require('express').Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', (req, res, next) => {
    let newIdea = addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    }
});

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.idea.id);
    if (deletedIdea) {
        res.status(204).send(deletedIdea);
    } else {
        res.status(404);
    }
});
module.exports = ideasRouter;
