const db = require('../data/dbConfig.js');

module.exports = {
  findBy,
  createCategory,
  updateCategory,
  deleteCategory,
};

// filter is an object with the following options for key names:
// id
// name
// user_id -- although this would be redundant
function findBy(filter, user_id) {
  return db('categories').where(filter).where({ user_id });
}

// add new category to `categories` table
// returns back the whole category object
function createCategory(category) {
  return db('categories').insert(category).returning(['id', 'name', 'user_id']);
}

// edit task in `categories` table by the id and user_id
function updateCategory(id, user_id, changes) {
  return db('categories').where({ id }).where({ user_id }).update(changes, '*');
}

// delete task in `categories` table by the id and user_id
function deleteCategory(id, user_id) {
  return db('categories').where({ id }).where({ user_id }).del();
}
