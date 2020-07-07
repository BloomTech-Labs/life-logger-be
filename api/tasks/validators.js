const helpers = require("./helpers");
const userHelpers = require("../users/helpers");

const userIdExists = (req, res, next) => {
  const { user_id } = req.params;
  let id = user_id;
  userHelpers
    .getUserByfilter({ id })
    .then((arr) => {
      if (arr.length < 1) {
        res.status(404).json({ message: "no user with this ID Found" });
      }
    })
    .catch((err) => res.status(500).json({ message: err }));

  next();
};

const taskExists = (req, res, next) => {
  const { task_id } = req.params;
  let id = task_id;
  helpers.findByTaskId(id)
    .then(([task]) => {
      if (task) {
        next();
      } else {
        res.status(200).json({ Message: "no task with this id exists" });
      }
    })
    .catch((err) => res.status(500).json({ message: err }));
};


const taskHasProperContent = (req, res, next) => {
    const { task_name, category_name, user_id, due_date } = req.body;
   
        if (task_name && category_name && user_id && due_date) {
            next()
        } else {
            res.status(400).json({ Message: "must contain task_name, category_name, user_id, due_date" });

        }
     
  
  
  };

  const taskNameExists = (req, res, next) => {
    const {task_name} = req.body
    helpers.findByTaskName(task_name)
    .then(([name]) => {
      if (name) {
        next()
      }
      else{
          helpers.addTaskName(task_name)
          .then(([id]) => {
            next()
          })
          .catch((err) => res.status(500).json({ message: err }));
      }
    })  
    .catch((err) => res.status(500).json({ message: err }));
  };
  const categoryNameExists = (req, res, next) => {
    const {category_name} = req.body
    helpers.findByCategoryName(category_name)
    .then(([name]) => {
      if (name) {
        next()
       
      }
      else{
          helpers.addCategoryName(category_name)
          .then(([id]) => {
            next()
            
          })
          .catch((err) => res.status(500).json({ message: err }));
      }
    })  
    .catch((err) => res.status(500).json({ message: err }));
  };

module.exports = {
  userIdExists,
  taskExists,
  taskHasProperContent,
  taskNameExists,
  categoryNameExists
};
