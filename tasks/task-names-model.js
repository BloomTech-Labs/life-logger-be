const db = require('../data/dbConfig.js');

module.exports = {
  createTaskName,
};

// add new task to `task_names` table
// returns an array of the `id` of the newly created `task_name`
function createTaskName(task) {
  // lower case taskName before adding it to db
  const lowercaseName = task.name.toLowerCase();

  const newTaskName = {
    name: lowercaseName,
    user_id: task.user_id,
  };

  return db('task_names').insert(newTaskName).returning('id');
}
