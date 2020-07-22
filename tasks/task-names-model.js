const db = require('../data/dbConfig.js');

module.exports = {
  findBy,
  createTaskName,
  updateTaskName,
  deleteTaskName,
};

// filter is an object with the following options for key names:
// id
// name
// user_id -- although this would be redundant
function findBy(filter, user_id) {
  return db('task_names').where(filter).where({ user_id });
}

// add new task to `task_names` table
function createTaskName(task) {
  return db('task_names').insert(task).returning(['id', 'name', 'user_id']);
}

// edit task in `task_names` table by the id and user_id
function updateTaskName(id, user_id, changes) {
  return db('task_names').where({ id }).where({ user_id }).update(changes, '*');
}

// delete task in `task_names` table by the id and user_id
function deleteTaskName(id, user_id) {
  return db('task_names').where({ id }).where({ user_id }).del();
}
