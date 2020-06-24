const router = require('express').Router();

const Tasks = require('./tasks-model.js');

// Return a task by user_id and task_id
router.get('/findById/user=:user_id/:task_id', (req, res) => {
  const { task_id, user_id } = req.params;

  Tasks.findById(task_id, user_id)
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(400).json({
          message: 'Could not find task with given id',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching task!', err });
    });
});

// Return all tasks by user_id
router.get('/findByUserId/:user_id', (req, res) => {
  const { user_id } = req.params;

  Tasks.findByUserId(user_id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching tasks!', err });
    });
});

// Insert a task
router.post('/insertTask', (req, res) => {
  const TaskData = req.body;

  if (!TaskData.task_id || !TaskData.user_id || !TaskData.due_date) {
    res
      .status(400)
      .json({ message: 'Task must have a task_id, user_id, and due_date' });
  } else {
    Tasks.add(TaskData)
      .then((task) => {
        res.status(201).json(task);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Failed to create new task!',
          err,
        });
      });
  }
});

// Delete a task by id and user_id
router.delete('/deleteTask/user=:user_id/:id', (req, res) => {
  const { id, user_id } = req.params;

  Tasks.remove(id, user_id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: `Deleted ${deleted} task(s)` });
      } else {
        res.status(400).json({
          message: 'Could not find task with given id',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Failed to delete task',
        err,
      });
    });
});

// update a task by user_id and id
router.put('/updateTask/user=:user_id/:id', (req, res) => {
  const { id, user_id } = req.params;
  const changes = req.body;

  Tasks.findById(id, user_id)
    .then((task) => {
      if (task.length) {
        Tasks.update(id, changes, user_id).then((updatedTask) => {
          res.status(200).json(updatedTask);
        });
      } else {
        res.status(400).json({
          message: 'Could not find task with given id!',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to update task!', err });
    });
});

module.exports = router;
