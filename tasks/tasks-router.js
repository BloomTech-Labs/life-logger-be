const router = require('express').Router();

const Tasks = require('./tasks-model.js');
const TaskNames = require('./task-names-model.js');

// Return a task by user_id and task_id
router.get('/findById/user=:user_id/:task_id', async (req, res) => {
  const { task_id, user_id } = req.params;

  try {
    const task = await Tasks.findById(task_id, user_id);

    if (task) {
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
  const TaskData = req.body;

  if (!TaskData.task_id || !TaskData.user_id || !TaskData.due_date) {
    res
      .status(400)
      .json({ message: 'Task must have a task_id, user_id, and due_date' });
  } else {
    try {
      const task = await Tasks.add(TaskData);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({
        message: 'Failed to create new task!',
        err,
      });
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
  const { id, user_id } = req.params;
  const changes = req.body;

  try {
    const task = await Tasks.findById(id, user_id);

    if (task.length) {
      try {
        const updatedTask = await Tasks.update(id, changes, user_id);
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
