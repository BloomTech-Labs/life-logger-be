<<<<<<< HEAD
<<<<<<< HEAD
const express = require('express');

const Events = require('./events-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Events.find()
    .then(events => {
      res.status(200).json(events);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
  
    Events.findById(id)
    .then(event => {
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: 'Could not find event with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get event' });
    });
  });

  router.post('/', (req, res) => {
    const eventData = req.body;
  
   Events.add(eventData)
    .then(newevent => {
      res.status(201).json(newevent);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new event' });
    });
  });

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Events.update(changes,id)
    .then(event => {
      if (event) {
        res.json({ update: event });
      } else {
        res.status(404).json({ message: 'Could not find event with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to update event'});
    });
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Events.remove(id)
    .then(count => {
      if (count) {
        res.json({ removed: count });
      } else {
        res.status(404).json({ message: 'Could not find event with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete event' });
    });
  });

 
  module.exports = router;

=======
=======
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
const router = require('express').Router();

const Events = require('./events-model.js');

const nopass = require('../auth/authenticate-middleware');

// Return All events
router.get('/', nopass, (req, res) => {
  Events.find()
    .then(event => {
      res.json(event);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: 'Error Fetching events!', err });
    });
});

// Return an Event by event_id
router.get(
  '/findbyid/:event_id',
  nopass,
  (req, res, next) => {
    const { event_id } = req.params;
    Events.findById(event_id)
      .then(event => {
        if (event) {
          res.status(200).json(event);
        } else {
          res
            .status(400)
            .json({
              message: 'Could not find event with given id'
            });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Error Fetching Event!', err });
      });
  }
);

// Return Events by user_id
router.get(
  '/byuserid/:user_id',
  nopass,
  (req, res, next) => {
    const { user_id } = req.params;

    Events.findByUserId(user_id)
      .then(event => {
        res.json(event);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Error Fetching Events!', err });
      });
  }
);

// Insert an Event
router.post('/insertevents', nopass, (req, res) => {
  const EventData = req.body;

  Events.add(EventData)
    .then(event => {
      res.status(201).json(event);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Failed to create new event!',
        err
      });
    });
});

// Delete an Event
router.delete(
  '/deleteevent/:event_id',
  nopass,
  (req, res) => {
    const { event_id } = req.params;

    Events.remove(event_id)
      .then(deleted => {
        if (deleted) {
          res.status(200).json({ removed: deleted });
        } else {
          res.status(400).json({
            message: 'Could not find event with given id'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Failed to delete event', err });
      });
  }
);

// update an event
router.put('/updateevent/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Events.findById(id)
    .then(event => {
      if (event) {
        Events.update(id, changes).then(updatedEvent => {
          res.status(200).json(updatedEvent);
        });
      } else {
        res.status(400).json({
          message: 'Could not find event with given id!',
          err
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: 'Failed to update event!', err });
    });
});

module.exports = router;
<<<<<<< HEAD
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
=======
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
