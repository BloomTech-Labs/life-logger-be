const express = require('express');

const Events = require('./event-model.js');

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
