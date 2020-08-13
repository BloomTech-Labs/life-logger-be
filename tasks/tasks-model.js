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
  // each task needs to return the id, task_id, task_notes, due_date, category_name (get via category_id), and task_name (get via task_id)
  return db('tasks')
    .select(
      'tasks.id',
      'tasks.user_id',
      'categories.name as category_name',
      'task_names.name as task_name',
      'tasks.task_notes',
      'tasks.due_date',
      'tasks.all_day',
      'tasks.is_complete'
    )
    .from('tasks')
    .innerJoin('task_names', 'tasks.task_id', '=', 'task_names.id')
    .innerJoin('categories', 'tasks.category_id', '=', 'categories.id')
    .where({ ['tasks.user_id']: user_id });
}

// Get tasks by task ID (not the task_id)
function findById(id, user_id) {
  return db('tasks')
    .select(
      'tasks.id',
      'tasks.user_id',
      'categories.name as category_name',
      'task_names.name as task_name',
      'tasks.task_notes',
      'tasks.due_date',
      'tasks.all_day',
      'tasks.is_complete'
    )
    .innerJoin('task_names', 'tasks.task_id', '=', 'task_names.id')
    .innerJoin('categories', 'tasks.category_id', '=', 'categories.id')
    .where({ ['tasks.id']: id })
    .where({ ['tasks.user_id']: user_id });
}

// Add a new task, returns the whole task
function add(task) {
  return db('tasks')
    .insert(task)
    .returning([
      'id',
      'task_id',
      'user_id',
      'category_id',
      'task_notes',
      'due_date',
      'all_day',
      'is_complete',
    ]);
}

// Update existing task, returns the whole task
function update(id, changes, user_id) {
  return db('tasks')
    .where({ id })
    .where({ user_id })
    .update(changes, [
      'id',
      'user_id',
      'category_id',
      'task_id',
      'task_notes',
      'due_date',
      'all_day',
      'is_complete',
    ]);
}

// Delete a task
function remove(id, user_id) {
  return db('tasks').where({ id }).where({ user_id }).del();
}
