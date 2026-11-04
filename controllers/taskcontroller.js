const database = require('../db');
const { AppError } = require('../utils/AppError');
const { success, fail } = require('../utils/response');
const { HTTPSTATUS_CODE } = require('../utils/statuscode');


const getTasks = async (req, res) => {
    return success(res, database.tasks, "Tasks feteched successfully.");
}

const getTask = async (req, res) => {
    const id = Number(req.params.id);
    const data = database.tasks.find(d => d.id === id);
    if (!data) return fail(res, "Data not found!", 404, HTTPSTATUS_CODE.NOTFOUND);
    return success(res, data, "Task Fetched successfully.");
}

const addTask = async (req, res) => {
    for (let i in database.tasks) {

        if (database.tasks[i].title === req.body.title) {
            return fail(res, 'This data already exist!', 409, HTTPSTATUS_CODE.CONFLICT);
        }

    }

    const newData = {
        id: database.nextId,
        ...req.body
    }

    database.tasks.push(newData);
    database.nextId += 1;

    return success(res, newData, "Task added successfully.", 201);
}

const updateFullTask = async (req, res) => {

    const id = Number(req.params.id);
    const data = database.tasks.find(d => d.id === id);

    if (!data) return fail(res, "Data not found!", 404, HTTPSTATUS_CODE.NOTFOUND);

    let updatedTask = null;
    for (i in database.tasks) {
        if (database.tasks[i].id === id) {
            database.tasks[i] = {
                ...database.tasks[i],
                ...req.body
            }
            updatedTask = database.tasks[i];
            break;
        }
    }

    return success(res, updatedTask, "Task Updated Successfully!");

}

const updateTask = async (req, res) => {

    const id = Number(req.params.id);
    const data = database.tasks.find(d => d.id === id);

    if (!data) return fail(res, "Data not Found!", 404, HTTPSTATUS_CODE.NOTFOUND);

    let updatedTask = null;
    for (i in database.tasks) {
        if (database.tasks[i].id === id) {
            database.tasks[i] = {
                ...database.tasks[i],
                ...req.body
            }
            updatedTask = database.tasks[i];
            break;
        }
    }

    return success(res, updatedTask, "Updated the task successfully.");

}

const removeTask = async (req, res) => {

    const id = Number(req.params.id);
    const data = database.tasks.find(d => d.id === id);

    if (!data) return fail(res, "Data not Found!", 404, HTTPSTATUS_CODE.NOTFOUND);

    for (i in database.tasks) {
        if (database.tasks[i].id === id) {
            database.tasks.splice(i, 1);
            break;
        }
    }

    return success(res, null, "Removed the file successfully.", 204);

}

module.exports = {
    getTasks,
    getTask,
    addTask,
    updateFullTask,
    updateTask,
    removeTask
}