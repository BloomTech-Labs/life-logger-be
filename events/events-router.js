const router = require('express').Router();

const Events = require('./events-model.js');

// const nopass = require('../auth/authenticate-middleware');

// Return All events
router.get('/', (req, res) => {
    Events.find()
        .then((event) => {
            res.status(200).json(event);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: 'Error Fetching events!', err });
        });
});

// Return an Event by event_id
router.get('/findbyid/:event_id', (req, res, next) => {
    const { event_id } = req.params;
    Events.findById(event_id)
        .then((event) => {
            if (event) {
                res.status(200).json(event);
            } else {
                res.status(400).json({
                    message: 'Could not find event with given id',
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error Fetching Event!', err });
        });
});

// Return Events by user_id
router.get('/byuserid/:user_id', (req, res, next) => {
    const { user_id } = req.params;

    Events.findByUserId(user_id)
        .then((event) => {
            res.json(event);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error Fetching Events!', err });
        });
});

// Insert an Event
router.post('/insertevents', (req, res) => {
    const EventData = req.body;

    Events.add(EventData)
        .then((event) => {
            res.status(201).json(event);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to create new event!',
                err,
            });
        });
});

// Delete an Event
router.delete('/deleteevent/:event_id', (req, res) => {
    const { event_id } = req.params;

    Events.remove(event_id)
        .then((deleted) => {
            if (deleted) {
                res.status(200).json({ removed: deleted });
            } else {
                res.status(400).json({
                    message: 'Could not find event with given id',
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Failed to delete event',
                err,
            });
        });
});

// update an event
router.put('/updateevent/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    console.log('i am authenticated');

    Events.findById(id)
        .then((event) => {
            if (event) {
                Events.update(id, changes).then((updatedEvent) => {
                    res.status(200).json(updatedEvent);
                });
            } else {
                res.status(400).json({
                    message: 'Could not find event with given id!',
                    err,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: 'Failed to update event!', err });
        });
});

module.exports = router;
