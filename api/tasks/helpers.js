const db = require("../../data/KnexConfig");

module.exports = {
  findBy,
  findById,
  findByUserId,
  add,
  update,
  remove,
  getAllTasks,
  findByTaskId,
  findByTaskName,
  addTaskName,
  addCategoryName,
  findByCategoryName
};

function findBy(filter, user_id) {
  return db("tasks").where(filter).where({ user_id });
}

// Get tasks by user ID
function getAllTasks() {
  return db("tasks")
    .join("task_names", "tasks.task_id", "=", "task_names.id")
    .join("categories", "tasks.category_id", "=", "categories.id")
    .select(
      "tasks.id as id",
      "categories.name as category_name",
      "task_names.name as task_name",
      "task_notes",
      "due_date",
      "all_day",
      "is_complete",
      "tasks.user_id as user_id"
    );

  // .select("*")
}

function findByUserId(user_id) {
  return db("tasks")
  .join("task_names", "tasks.task_id", "=", "task_names.id")
    .join("categories", "tasks.category_id", "=", "categories.id")
    .select(
        "tasks.id as id",
        "categories.name as category_name",
        "task_names.name as task_name",
        "task_notes",
        "due_date",
        "all_day",
        "is_complete",
        "tasks.user_id as user_id"
      )
      .where({ ["tasks.user_id"]: user_id });
}

// Get tasks by task ID
function findById(id, user_id) {
  return db("tasks")
    .join("task_names", "tasks.task_id", "=", "task_names.id")
    .join("categories", "tasks.category_id", "=", "categories.id")
    .select(
      "tasks.id as id",
      "categories.name as category_name",
      "task_names.name as task_name",
      "task_notes",
      "due_date",
      "all_day",
      "is_complete",
      "tasks.user_id as user_id"
    )

    .where({ ["tasks.id"]: id })
    .where({ ["tasks.user_id"]: user_id });

  //   .select("tasks.id as id","categories.name as category_name", "task_names.name as task_name", "task_notes", "due_date", "all_day", "is_complete")
}

function findByTaskId(id) {
  return db("tasks").select("*").where({ id });
}

function findByTaskName(name) {
    return db("task_names").select("*").where({ name });
  }

  function findByCategoryName(name) {
    return db("categories").select("*").where({ name });
  }

// Add a new task, returns the whole task
function add(task) {
  return db("tasks").insert(task, "id")
  .then(([id]) => {
      return findByTaskId(id)
  })
  .catch(err => console.error(err))
}

function addTaskName(name) {
    return db("task_names").insert({name: name}, "id")
  }


function addCategoryName(name) {
    return db("categories").insert({name: name}, "id")
  }


// Update existing task, returns the whole task
function update(id, changes, user_id) {
  return db("tasks").where({ id }).where({ user_id }).update(changes, "*");
}

// Delete a task
function remove(id, user_id) {
  return db("tasks").where({ id }).where({ user_id }).del();
}
