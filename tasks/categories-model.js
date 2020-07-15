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
function createCategory(category) {
  // lower case taskName before adding it to db
  const lowercaseName = category.name.toLowerCase();

  const newCategoryName = {
    name: lowercaseName,
    user_id: category.user_id,
  };

  return db('categories').insert(newCategoryName);
}

// edit task in `categories` table by the id and user_id
function updateCategory(id, user_id, changes) {
  return db('categories').where({ id }).where({ user_id }).update(changes, '*');
}

// delete task in `categories` table by the id and user_id
function deleteCategory(id, user_id) {
  return db('categories').where({ id }).where({ user_id }).del();
}
