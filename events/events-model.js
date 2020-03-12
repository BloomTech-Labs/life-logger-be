const db = require('../data/dbConfig.js');

module.exports = {
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
