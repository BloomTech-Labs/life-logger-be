const db = require('../data/dbConfig.js');

module.exports = {
  findBy,
  findById,
  findByUserId,
  add,
  update,
  remove,
};

function findBy(filter, user_id) {
  return db('tasks').where(filter).where({ user_id });
}

// Get tasks by user ID
function findByUserId(user_id) {
  return db('tasks').where({ user_id });
}

// Get tasks by task ID
function findById(id, user_id) {
  return db('tasks').where({ id }).where({ user_id });
}

// Add a new task, returns the whole task
function add(task) {
  return db('tasks').insert(task).returning('id');
}

// Update existing task, returns the whole task
function update(id, changes, user_id) {
  return db('tasks').where({ id }).where({ user_id }).update(changes, '*');
}

// Delete a task
function remove(id, user_id) {
  return db('tasks').where({ id }).where({ user_id }).del();
}
