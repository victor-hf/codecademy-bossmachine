const minionsRouter = require('express').Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getAllWorkFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    updateWorkInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    if (newMinion) {
        res.status(201).send(newMinion);
    }
});

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deletedMinion = deleteFromDatabasebyId('minions', req.minion.id);
    if (deletedMinion) {
        res.status(204).send(deletedMinion);
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res, next) => {
    let minionWork = getAllWorkFromDatabase(req.minion.id);
    res.status(200).send(minionWork);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    let newWork = addToDatabase('work', req.body);
    res.status(201).send(newWork);
    console.log(newWork);
});

minionsRouter.param(':workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    console.log(work);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.put('/:minionId/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        let updatedWork = updateWorkInstanceInDatabase(req.body, req.minion.id);
        console.log(updatedWork);
        res.send(updatedWork);
    }
});

minionsRouter.delete('/:minionId/:workId', (req, res, next) => {
    const deletedWork = deleteFromDatabasebyId('work', req.work.id);
    if (deletedWork) {
        res.status(204).send(deletedWork);
    }
});

// GET /api/minions/:minionId/work to get an array of all work for the specified minon.
// POST /api/minions/:minionId/work to create a new work object and save it to the database.
// PUT /api/minions/:minionId/work/:workId to update a single work by id.
// DELETE /api/minions/:minionId/work/:workId to delete a single work by id

module.exports = minionsRouter;
