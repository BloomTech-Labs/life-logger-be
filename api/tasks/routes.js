const express = require("express");
const router = express.Router();


const {
    findByIDHandler,
    getAllTasksHandler,
    findAllTasksByUserIDHandler,
    insertTaskHandler,
    deleteTaskHandler
} = require("./handlers");

const {
    userIdExists,
    taskExists,
    taskHasProperContent,
    taskNameExists,
    categoryNameExists
} = require("./validators");


router.get("/", getAllTasksHandler);
router.get("/findById/user=:user_id/:task_id", userIdExists, findByIDHandler);
router.get("/findByUserId/:user_id", userIdExists, taskExists, findAllTasksByUserIDHandler);
router.post("/insertTask", taskHasProperContent, taskNameExists, categoryNameExists, insertTaskHandler);
router.delete("/deleteTask/:task_id/:user_id", taskExists, deleteTaskHandler);





module.exports = router;