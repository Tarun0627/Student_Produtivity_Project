const TaskModel = require('../task/tasks.model');

class TaskController {
    /**
     * Constructor for TaskController class.
     * Initializes a new instance of TaskModel.
     */
    constructor() {
        this.Task = new TaskModel();
    }

    /**
     * Creates a new task.
     * @param {Object} req - The request object containing the task data.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async createTask(req, res, next) {
        try {
            console.log("this.tASK",this.Task)
            const task = await this.Task.post(req.body);
            res.json(task);
        } catch (error) {
            console.error("Error occurred while creating task", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Fetches tasks based on provided criteria.
     * @param {Object} req - The request object containing the criteria for fetching tasks.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async fetchTask(req, res, next) {
        try {
            const tasks = await this.Task.get(req.body);
            res.json(tasks);
        } catch (error) {
            console.error("Error occurred while fetching tasks", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Updates an existing task.
     * @param {Object} req - The request object containing the task ID and updated data.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async updateTask(req, res, next) {
        try {
            const taskId = req.params.id;
            const newData = req.body;
            const result = await this.Task.put({ _id: taskId }, newData);
            res.json(result);
        } catch (error) {
            console.error("Error occurred while updating task", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Deletes a task.
     * @param {Object} req - The request object containing the task ID.
     * @param {Object} res - The response object used to send a JSON response.
     */
    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.id;
            const result = await this.Task.delete({ _id: taskId });
            res.json(result);
        } catch (error) {
            console.error("Error occurred while deleting task", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TaskController;

