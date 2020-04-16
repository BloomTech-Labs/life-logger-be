const db = require('../data/dbConfig.js');

module.exports = {
<<<<<<< HEAD
<<<<<<< HEAD
    find,
    findBy,
    findById,
    add,
    update,
    remove
}


function find() {
    return db('events');
}

function findBy(filter) {
    return db('events').where(filter)
}

function findById(id) {
    return db('events').where({id}).first();
    }

    function add(event) {
        return db('events').insert(event)
        .then(ids => {
             return findById(ids[0])
        })
    }

    function update(id, changes) {
        return db('events').where({id}).update(changes)
        .then(count => {
            return findById(id)
        })
    }
    
    function remove(id) {
        return db('events').where({id}).del()
    }
=======
=======
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
  find,
  findBy,
  findById,
  findByUserId,
  add,
  update,
  remove
};

// Get all events
function find() {
  return db('events');
}

function findBy(filter) {
  return db('events').where(filter);
}

// Get events by user ID
function findByUserId(user_id) {
  return db('events').where({ user_id });
}

// Get events by event ID
function findById(id) {
  return db('events').where({ id }).first();
}

// Add a new event
function add(event) {
  return db('events').insert(event).returning('id');
}

// Update existing event
function update(id, changes) {
  return db('events').where({ id }).update(changes, '*');
}

// Delete an event
function remove(id) {
  return db('events').where({ id }).del();
}
<<<<<<< HEAD
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
=======
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
