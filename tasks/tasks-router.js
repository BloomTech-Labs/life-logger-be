const router = require('express').Router();

const Tasks = require('./tasks-model.js');
const TaskNames = require('./task-names-model.js');
const Categories = require('./categories-model');

// Return a task by user_id and task id (not the task_id tied to the task_names table)
router.get('/findById/user=:user_id/:task_id', async (req, res) => {
  const { task_id, user_id } = req.params;

  try {
    const task = await Tasks.findById(task_id, user_id);

    if (task.length) {
      res.status(200).json(task);
    } else {
      res.status(400).json({
        message: 'Could not find task with given id',
      });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching task!', err });
  }
});

// Return all tasks by user_id
router.get('/findByUserId/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const tasks = await Tasks.findByUserId(user_id);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks!', err });
  }
});

// Insert a new task to `task_names`
router.post('/newTaskName', async (req, res) => {
  // check if the body has a task name and user_id
  // should probably have some middleware to check if the user_id is valid
  const task = req.body;

  if (!task.name || !task.user_id) {
    res.status(400).json({ message: 'Must include a name and user_id' });
  } else {
    try {
      // returns an array of the `id` of the newly created `task_name`
      const response = await TaskNames.createTaskName(task);
      res.status(201).json({ task_name_id: response[0] });
    } catch (err) {
      res.status(500).json({
        message: 'Failed to create new task!',
        err,
      });
    }
  }
});

// Insert a task
router.post('/createTask', async (req, res) => {
  // need to first check if task name already exists in `task_names` table -- if not, add it
  // then check if category name already exists in `categories` table -- if not, add it
  // then add the rest of the necessary data to the `tasks` table

  const TaskData = req.body;

  if (!TaskData.user_id || !TaskData.due_date) {
    res
      .status(400)
      .json({ message: 'Task must have a task_id, user_id, and due_date' });
  } else {
    try {
      // check if task name already exists in task_names table
      const taskNameRes = await TaskNames.findBy(
        { name: TaskData.task_name.toLowerCase() },
        TaskData.user_id
      );

      let newTaskNameRes = [{ ...TaskData }];

      // if the task name doesn't exist in the task_names table, add it
      if (!taskNameRes.length) {
        const newTaskName = {
          name: TaskData.task_name.toLowerCase(),
          user_id: TaskData.user_id,
        };

        newTaskNameRes = await TaskNames.createTaskName(newTaskName);
      }

      // check if category name already exists in categories table
      const categoryRes = await Categories.findBy(
        { name: TaskData.category_name },
        TaskData.user_id
      );

      let newCategoryRes = [...categoryRes];

      // if the category name doesn't exist in the categories table, add it
      if (!categoryRes.length) {
        const newCategory = {
          name: TaskData.category_name,
          user_id: TaskData.user_id,
        };

        newCategoryRes = await Categories.createCategory(newCategory);
      }

      const newTask = {
        user_id: TaskData.user_id,
        task_id: newTaskNameRes[0].id,
        category_id: newCategoryRes[0].id,
        task_notes: TaskData.task_notes,
        due_date: TaskData.due_date,
        all_day: TaskData.all_day,
        is_complete: TaskData.is_complete,
      };

      // create a new task
      const addedTaskRes = await Tasks.add(newTask);

      res.status(201).json(addedTaskRes);
    } catch (err) {
      res.status(500).json({ message: 'Error finding task_name', err });
    }
  }
});

// Delete a task by id and user_id
router.delete('/deleteTask/user=:user_id/:id', async (req, res) => {
  const { id, user_id } = req.params;

  try {
    const task = await Tasks.findById(id, user_id);

    if (task.length) {
      try {
        const deletedCount = await Tasks.remove(id, user_id);

        if (deletedCount) {
          res.status(200).json({ message: `Deleted ${deletedCount} task(s)` });
        } else {
          res.status(400).json({
            message: 'Could not find task with given id',
          });
        }
      } catch (err) {
        res.status(500).json({
          message: 'Failed to delete task',
          err,
        });
      }
    } else {
      res.status(400).json({
        message: 'Could not find task with given id!',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Failed to delete task. It is possible the task does not exist',
      err,
    });
  }
});

// update a task by user_id and id
router.put('/updateTask/user=:user_id/:id', async (req, res) => {
  // need to first check if task name already exists in `task_names` table -- if not, add it
  // then check if category name already exists in `categories` table -- if not, add it
  // then add the rest of the necessary data to the `tasks` table

  const { id, user_id } = req.params;
  const changes = req.body;

  const editedTask = {
    user_id: changes.user_id,
    task_notes: changes.task_notes,
    due_date: new Date(changes.due_date),
    all_day: changes.all_day,
    is_complete: changes.is_complete,
  };

  if (changes.task_name) {
    // check if task name already exists in task_names table
    const taskNameRes = await TaskNames.findBy(
      { name: changes.task_name.toLowerCase() },
      user_id
    );

    // if the task name doesn't exist in the task_names table, add it
    if (!taskNameRes.length) {
      const newTaskName = {
        name: changes.task_name.toLowerCase(),
        user_id,
      };

      const newTaskNameRes = await TaskNames.createTaskName(newTaskName);
      editedTask.task_id = newTaskNameRes[0].id;
    } else {
      editedTask.task_id = taskNameRes[0].id;
    }
  }

  if (changes.category_name) {
    // check if category name already exists in categories table
    const categoryRes = await Categories.findBy(
      { name: changes.category_name },
      user_id
    );

    // if the category name doesn't exist in the categories table, add it
    if (!categoryRes.length) {
      const newCategory = {
        name: changes.category_name,
        user_id,
      };

      const newCategoryRes = await Categories.createCategory(newCategory);
      editedTask.category_id = newCategoryRes[0].id;
    } else {
      editedTask.category_id = categoryRes[0].id;
    }
  }

  try {
    const task = await Tasks.findById(id, user_id);

    if (task.length) {
      try {
        const updatedTask = await Tasks.update(id, editedTask, user_id);
        res.status(200).json(updatedTask);
      } catch (err) {
        res.status(400).json({
          message: 'Could not find task with given id!',
        });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task!', err });
  }
});

module.exports = router;
