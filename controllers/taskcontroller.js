
const AppError = require('../utils/AppError');
const { success, fail } = require('../utils/response');
const { HTTPSTATUS_CODE } = require('../utils/statuscode');
const Task = require('../models/task');
const { default: mongoose } = require('mongoose');


const addTask = async (req, res) => {

    try {

        const title = req.body.title;
        const newTask = new Task({
            title
        });

        const result = await newTask.save();

        return success(res, result, "Task added successfully.", 201);

    } catch (err) {
        throw new AppError(err.message);
    }

}
const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find();
        return success(res, tasks, "Tasks feteched successfully.");

    } catch (err) {
        throw new AppError(err.message);
    }
}

const getTask = async (req, res) => {

    try {

        const id = req.params.id;
        if (!id) throw new AppError('Id not valid.');
        const data = await Task.findById({ _id: req.params.id });
        if (!data) return fail(res, "Data not found!", 404, HTTPSTATUS_CODE.NOTFOUND);
        return success(res, data, "Task Fetched successfully.");

    } catch (err) {
        throw new AppError(err.message)
    }
}


const updateFullTask = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await Task.updateOne({ _id: new mongoose.Types.ObjectId(id) }, {
            ...req.body
        })

        if (!result.acknowledged) throw new AppError('Data couldnt update.');
        return success(res, null, "Task Updated Successfully!");

    } catch (err) {
        throw new AppError(err.message);
    }

}

const updateTask = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await Task.updateOne({ _id: new mongoose.Types.ObjectId(id) }, {
            ...req.body
        });
        if (!result.acknowledged) return fail(res, "Data not Found!", 404, HTTPSTATUS_CODE.NOTFOUND);

        return success(res, null, "Updated the task successfully.");

    } catch (err) {
        throw new AppError(err.message);
    }

}

const removeTask = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await Task.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!result.acknowledged) throw new AppError('Couldnt remove the document.');
        return success(res, null, "Removed the file successfully.", 204);

    } catch (err) {

        throw new AppError(err.message);
    }

}

module.exports = {
    getTasks,
    getTask,
    addTask,
    updateFullTask,
    updateTask,
    removeTask
}