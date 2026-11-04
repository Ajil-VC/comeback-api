

const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controllers/taskcontroller');

taskRouter
    .post('', taskController.addTask)
    .put('/:id', taskController.updateFullTask)
    .patch('/:id', taskController.updateTask)
    .get('', taskController.getTasks)
    .get('/:id', taskController.getTask)
    .delete ('/:id', taskController.removeTask)

module.exports = taskRouter;