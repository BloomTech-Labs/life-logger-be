const router = require('express').Router()

const Events = require('./events-model.js');

const nopass = require('../auth/authenticate-middleware');

// Return All events 
router.get('/', nopass , (req, res) => {
    Events.find()
.then(event => {
    res.json(event);
})
.catch(err => {
 console.log(err);
 res.status(500).json({ message: "Error Fetching events!"});

})

});

// Return and Event by event_id
router.get('/findById/:events_id', nopass , (req, res, next) => {

    const { event_id } = req.params;

    Events.findById(event_id)
    .where({event_id})
.then(event => {
    res.json(event);
})
.catch(err => {
 console.log(err);
 res.status(500).json({ message: "Error Fetching Event!"});

})

});

// Return Events by user_id
router.get('/byuserid/:user_id', nopass , (req, res, next) => {

    const { user_id } = req.params;

    Events.findByUserId(user_id)
    .where({user_id})
.then(event => {
    res.json(event);
})
.catch(err => {
 console.log(err);
 res.status(500).json({ message: "Error Fetching Events!"});

})

});

// Insert an Event
router.post('/insertevents', nopass, (req, res) => {
    
    const EventData = req.body;
  
    Events.add(EventData)
    .then(event => {
      res.status(201).json(event);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new event!', err });
    });
  });


// Delete an Event
router.delete('/deleteevent/:id', nopass, (req, res) => {
    const { id } = req.params;
  
    Events.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find event with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete event' });
    });
  });

  // update an event 
  router.put('/updateevent/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Events.findById(id)
    .then(event => {
      if (event) {
        Events.update(changes, id)
        .then(updatedEvent => {
          res.json(updatedEvent);
        });
      } else {
        res.status(404).json({ message: 'Could not find event with given id!' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update event!' });
    });
  });


module.exports = router; 